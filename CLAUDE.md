# CLAUDE.md - lora-trigger

This file provides guidance to Claude Code when working with the lora-trigger automation tool.

## Overview

**lora-trigger** is a CLI-based automation tool for triggering and testing LORA (Loan Origination and Risk Assessment) workflows. It creates test submissions, populates form data, and automates multi-step survey processes to facilitate development and testing.

## Purpose

- **Rapid Testing**: Create loan application submissions without manual UI interaction
- **Workflow Automation**: Complete multi-page survey forms automatically
- **Data Generation**: Generate realistic test data using Faker.js
- **Integration Testing**: Test end-to-end workflows across microservices
- **Development Efficiency**: Speed up local development by automating repetitive tasks

## Architecture

### Project Structure

```
lora-trigger/
├── config.js                    # Central configuration (URLs, credentials, timing)
├── index.js                     # CLI entry point and command dispatcher
├── package.json                 # Dependencies: arangojs, @faker-js/faker
├── CLAUDE.md                    # This file - documentation for Claude Code
├── triggers/                    # Trigger implementations
│   ├── survey/                  # Survey workflow triggers
│   │   ├── ndf2w.js            # 2-wheel survey trigger
│   │   ├── ndf4w.js            # 4-wheel survey trigger
│   │   ├── ndf4w-mq.js         # 4-wheel MQ-only variant
│   │   └── ndf4w-with-automation.js  # 4-wheel with full form automation
│   ├── underwriting/           # Underwriting triggers
│   │   └── ca.js               # Credit Analysis trigger
│   ├── bpkbreview/             # BPKB review triggers
│   │   └── ops.js              # Operations trigger
│   ├── automation/             # Form automation framework
│   │   ├── ndf4w-form-submission.js  # Core automation logic
│   │   ├── pages/              # Individual page payload files
│   │   ├── index.js            # Re-exports
│   │   └── README.md           # Detailed automation docs
│   ├── utils/                  # Shared utilities
│   │   ├── cleanse.js          # String sanitization
│   │   └── license_plate.js   # Random license plate generation
│   ├── start-application.js    # Workflow initiation via Temporal
│   └── trigger-appointment.js  # MQ message publishing
└── helpers/                    # Shell scripts for setup
```

### Key Components

#### 1. **CLI Dispatcher** ([index.js](index.js))
```javascript
// Command structure: node index.js <taskType> <triggerType> [options]
node index.js survey ndf4w                    // Create 4W survey
node index.js automation ndf4w-full           // Create + auto-complete forms
node index.js underwriting ca                 // Trigger credit analysis
node index.js bpkbreview ops                  // Trigger BPKB review
```

#### 2. **Configuration** ([config.js](config.js))
Single source of truth for all settings:
- Service URLs (Gateway, Task Service, MQ)
- ArangoDB connection (for task queries)
- Automation timing (polling intervals, retries, delays)

#### 3. **Trigger Types**

**Survey Triggers:**
- `ndf2w` - 2-wheel (motorcycle) loan application
- `ndf4w` - 4-wheel (car) loan application
- `ndf4w-mq` - 4-wheel with custom workflow/appointment
- `ndf4w-with-automation` - 4-wheel + auto-complete all 10 form pages

**Other Triggers:**
- `ca` - Credit Analysis (underwriting)
- `ops` - Operations (BPKB review)

#### 4. **Automation Framework** ([triggers/automation/](triggers/automation/))

**Core Modules:**
- **ndf4w-form-submission.js** - Orchestration logic
  - `waitForTask()` - Poll ArangoDB for task creation
  - `getTaskDetail()` - Fetch current form state
  - `submitForm()` - POST form data
  - `waitForFormChange()` - Retry logic for state transitions
  - `executeFormSequence()` - Run page sequence with delays
  - `Ndf4wFormAutomation()` - Main entry point

- **pages/** - Individual page template files
  - 10 page payload functions (Page1PIN → Page10FinancingFinal)
  - Parameterized with license plate substitution
  - Easy to reorder or create custom sequences
  - Exported via pages/index.js

**Features:**
- ✅ Composable page sequences
- ✅ Retry logic for slow form transitions
- ✅ Configurable delays and timeouts
- ✅ Smart task polling (starts when ready, not fixed wait)
- ✅ All configs in central config.js

## Common Commands

### Running Triggers

```bash
# Install dependencies
npm install  # or: pnpm install

# Create 4W survey application only
node index.js survey ndf4w

# Create 4W survey + auto-complete all forms
node index.js automation ndf4w-full

# With specific actor
node index.js automation ndf4w-full actor=vd

# Other triggers
node index.js survey ndf2w
node index.js underwriting ca
node index.js bpkbreview ops
```

### Actors

Defined in `triggers/survey/ndf2w.js` `mapActor`:
- `admin` - Default admin user
- `vd` - Verification/surveyor user
- `vd_branch_visit` - Branch visit surveyor
- `vd_custom` - Custom surveyor

Each actor maps to:
- `resource_identifiers` - User ID for x-user-id header
- `resource_type` - Resource type code
- `location_type_code` - Location type for appointments

## Configuration Details

### Service URLs ([config.js](config.js))
```javascript
lgs_base_url: "http://127.0.0.1:8081",  // Gateway Service
lts_base_url: "http://127.0.0.1:8082",  // Task Service
```

### ArangoDB ([config.js](config.js))
```javascript
arango_url: "http://127.0.0.1:8529",
arango_db: "test",
arango_user: "root",
arango_password: "root",
```

### Automation Timing ([config.js](config.js))
```javascript
automation: {
  task_poll_interval_ms: 3000,        // Poll every 3s for task
  task_poll_timeout_ms: 120000,       // 2min timeout
  form_change_max_retries: 3,         // Retry form state check 3x
  form_change_retry_delay_ms: 10000,  // 10s between retries
  form_submission_delay_ms: 5000,     // 5s between pages
}
```

## Data Flow

### Standard Trigger (ndf4w)
1. Call `StartApplication()` → Creates Temporal workflow → Returns `workflowId`
2. POST to `/application/{workflowId}/data` → Submits initial application data
3. GET `/rtc/web/url` → Gets video call URL for survey
4. Wait 15 seconds
5. Send appointment to RabbitMQ via HTTP API

### Automation Trigger (ndf4w-full)
1. **Create Application** (same as above)
2. **Poll for Task** (3s intervals, 2min timeout)
   - Query ArangoDB: `FOR task IN task FILTER task.document_id == workflowId AND task.type == "SURVEY"`
3. **Execute Form Sequence** (10 pages)
   - For each page:
     - GET task detail → check current `form_name`
     - POST form payload → submit data
     - Wait 5s → allow backend processing
     - Verify form changed (retry up to 3x if not)
4. **Complete** → Log final task state

## Integration Points

### Services Used
- **Gateway Service** (port 8081) - Application data submission
- **Task Service** (port 8082) - Form submission, task state queries
- **ArangoDB** (port 8529) - Task lookup by workflow ID
- **RabbitMQ** (port 15672) - Appointment message publishing via HTTP API
- **Temporal** - Workflow orchestration (via Gateway Service)

### No Direct Database Access
- All application/document data goes through Gateway Service HTTP API
- ArangoDB queries only for task ID lookup (read-only)
- Design is service-oriented, not database-oriented

## Development Patterns

### Adding a New Trigger

1. **Create trigger file** in appropriate folder (survey/underwriting/bpkbreview)
   ```javascript
   export const MyNewTrigger = async (actor) => {
     const { workflowId, start } = await StartApplication();
     // ... implementation
   };
   ```

2. **Export from index.js** in that folder
   ```javascript
   export { MyNewTrigger } from "./my-new-trigger.js";
   ```

3. **Add to CLI dispatcher** ([index.js](index.js))
   ```javascript
   case "my-task-type":
     switch (triggerType) {
       case "my-trigger":
         await MyNewTrigger(actor);
         break;
     }
   ```

### Adding a New Form Page

1. **Add payload function** to a new file in [triggers/automation/pages/](triggers/automation/pages/)
   ```javascript
   // triggers/automation/pages/page-11-my-new-page.js
   export const Page11MyNewPage = (taskId, params) => ({
     formName: "form_my_new_page_show",
     payload: {
       "$.field.path": "value",
       action: "submit",
     },
   });
   ```

2. **Export from pages/index.js**
   ```javascript
   export { Page11MyNewPage } from "./page-11-my-new-page.js";
   ```

3. **Add to sequence**
   ```javascript
   export const DEFAULT_FORM_SEQUENCE = [
     Page1PIN,
     // ...
     Page10FinancingFinal,
     Page11MyNewPage,  // New page
   ];
   ```

### Creating Custom Form Sequences

```javascript
import {
  Page1PIN,
  Page2Verification,
  Page7Financing,
} from "./pages/index.js";

// Skip intermediate pages for faster testing
const quickSequence = [
  Page1PIN,
  Page2Verification,
  Page7Financing,
];

await Ndf4wFormAutomation(workflowId, userId, licensePlate, customerName, quickSequence);
```

## Error Handling

### Common Issues

**Task Not Found**
```
✖ Task not found for workflow xxx after 120s timeout
```
**Solution:** Check Temporal workers are running, workflow was created successfully

**Form State Not Changing**
```
⚠ Form still "form_verification_show" after attempt 3/3
```
**Solution:** Check Task Service logs, verify payload is valid, test manually in UI

**ArangoDB Connection Refused**
```
✖ Error querying ArangoDB: connect ECONNREFUSED
```
**Solution:** Start ArangoDB via docker-compose, verify credentials in config.js

**HTTP 400/500 Errors**
```
✖ Error submitting form: HTTP 400: Bad Request
```
**Solution:** Check payload format in pages/ files, verify field paths and document IDs are valid

### Resilience Features

- Form submission errors are logged but don't stop execution (continues to next page)
- Task polling has configurable timeout (default 2 minutes)
- Form state changes retry up to 3 times before continuing
- All HTTP errors are caught and logged with context

## Testing Strategy

### Manual Testing
```bash
# Test individual page submission
node -e "
import { submitForm } from './triggers/automation/ndf4w-form-submission.js';
import { Page2Verification } from './triggers/automation/pages/index.js';

const taskId = 'your-task-id';
const userId = 'user-id';
const { payload } = Page2Verification(taskId, { licensePlate: 'B1234XYZ' });
await submitForm(taskId, userId, payload);
"
```

### Full Automation Test
```bash
# Run full automation and monitor logs
node index.js automation ndf4w-full actor=admin
```

### Verify Completion
- Check final task state in logs
- Verify in UI at http://localhost:3000/admin
- Query ArangoDB to see task status

## Dependencies

### Runtime Dependencies
- **arangojs** (^10.1.2) - ArangoDB client for task queries

### Dev Dependencies
- **@faker-js/faker** (^9.9.0) - Realistic test data generation

### Node.js Features Used
- Native `fetch()` API (Node 18+)
- ES modules (`"type": "module"`)
- Native `crypto.randomUUID()` (Node 15.7+)
- Native `Buffer` for Base64 encoding

## Performance Considerations

### Timing Optimization
- **Task polling**: 3s intervals (balance between responsiveness and DB load)
- **Form delays**: 5s between pages (allows backend processing)
- **Smart waiting**: Starts automation immediately when task found (not fixed 30s wait)

### Expected Duration
- Application creation: ~5 seconds
- Task polling: ~5-15 seconds (usually finds task quickly)
- Form automation (10 pages): ~2-3 minutes
- **Total**: ~2.5-3.5 minutes for full automation

## Best Practices

### DO:
- ✅ Use centralized config.js for all settings
- ✅ Follow existing naming patterns (lowercase actors, snake_case for form fields)
- ✅ Test individual pages before running full sequence
- ✅ Log important state transitions for debugging
- ✅ Use existing utilities (cleanse, generateLicensePlate)

### DON'T:
- ❌ Hardcode URLs, timeouts, or credentials in trigger files
- ❌ Access ArangoDB for writes (read-only for task lookup)
- ❌ Skip error handling (always wrap HTTP calls in try-catch)
- ❌ Commit sensitive data (use .env for secrets if needed)
- ❌ Modify generated code or files in resources/gen/

## Related Files

- **Automation README**: [triggers/automation/README.md](triggers/automation/README.md) - Detailed automation documentation
- **Form Payloads**: [triggers/automation/pages/](triggers/automation/pages/) - All 10 page payload templates
- **Parent CLAUDE.md**: [../CLAUDE.md](../CLAUDE.md) - Monorepo-level documentation

## Future Enhancements

Potential improvements:
- Add support for LOW RISK variant (different form sequence)
- Add support for NDF2W (2-wheel) automation
- Parameterize document IDs (upload real documents vs hardcoded UUIDs)
- Add screenshot capture on errors
- Generate test reports with timestamps and success/failure metrics
- Support for conditional page flows (skip pages based on risk level)
- Environment-specific configs (dev/staging/production)
- Parallel automation execution (run multiple instances)
