# Task Checklist for Website Refactor
<div style="border-left: 4px solid #dfe2e5; padding-left: 15px; margin-top: -5px; margin-bottom: 25px;">
  <h2 style="color: #f78d24; margin: 0; border-bottom: none; font-size: 26px;">Website Refactor</h2>
</div>

- [ ] Analyze current `website` module code and deployment configuration
- [ ] Identify Pages-specific code and assets that need refactoring
- [ ] Refactor build pipeline to generate Astro static output for Workers
- [ ] Update Wrangler and deployment scripts to deploy Astro build to Workers
- [ ] Verify all dependencies work in the new Workers-first setup
- [ ] Update documentation (MD, SH scripts) to reflect new workflow
- [ ] Harden CI/CD and run integration tests
- [ ] Review and merge changes across all modules


---
[⬅️ Return to Task File Audit](../../task-file-audit.md)