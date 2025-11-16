# Deployment Report: %%MODULE_NAME%% %%MODE_NAME%%

**Execution Time:** `%%EXECUTION_TIME%%`

| Module          | Status      | Version          | URL                     |
| --------------- | ----------- | ---------------- | ----------------------- |
| **APP**         | %%APP_STATUS%%     | %%APP_VERSION%%     | [Link](%%APP_URL%%)     |
| **ADMIN**       | %%ADMIN_STATUS%%   | %%ADMIN_VERSION%%   | [Link](%%ADMIN_URL%%)   |
| **APEX**        | %%APEX_STATUS%%    | %%APEX_VERSION%%    | [Link](%%APEX_URL%%)    |

---

## Deployment Verification
- **Console Error Check:** `%%CONSOLE_STATUS%%`
- **Details:**
  ```
  %%CONSOLE_OUTPUT%%
  ```

---

## Instruction Change Summary
*This report summarizes the deployment of the **%%MODULE_NAME%%** module to the **%%MODE_NAME%%** environment.*

%%INSTRUCTION_SUMMARY%%

---

## Deployment URLs (Clickable)

### APP Module (`%%APP_STATUS%%`)
| Mode | Cloudflare URL | Localhost URL |
| :--- | :--- | :--- |
| **Preview** | [Link](%%APP_PREVIEW_URL%%) | [Link](%%APP_LOCAL_URL%%) |
| **Staging** | [Link](%%APP_STAGING_URL%%) | [Link](%%APP_LOCAL_URL%%) |
| **Production**| [Link](%%APP_PROD_URL%%) | [Link](%%APP_LOCAL_URL%%) |

### ADMIN Module (`%%ADMIN_STATUS%%`)
| Mode | Cloudflare URL | Localhost URL |
| :--- | :--- | :--- |
| **Preview** | [Link](%%ADMIN_PREVIEW_URL%%) | [Link](%%ADMIN_LOCAL_URL%%) |
| **Staging** | [Link](%%ADMIN_STAGING_URL%%) | [Link](%%ADMIN_LOCAL_URL%%) |
| **Production**| [Link](%%ADMIN_PROD_URL%%) | [Link](%%ADMIN_LOCAL_URL%%) |

### APEX Module (`%%APEX_STATUS%%`)
| Mode | Cloudflare URL | Localhost URL |
| :--- | :--- | :--- |
| **Preview** | [Link](%%APEX_PREVIEW_URL%%) | [Link](%%APEX_LOCAL_URL%%) |
| **Staging** | [Link](%%APEX_STAGING_URL%%) | [Link](%%APEX_LOCAL_URL%%) |
| **Production**| [Link](%%APEX_PROD_URL%%) | [Link](%%APEX_LOCAL_URL%%) |

---

### Quick Test Commands
```bash
# Test the deployed module
scripts/cloudcache test-preview %%MODULE_NAME_LOWER%%

# Start local development for all modules
pnpm dev
```
