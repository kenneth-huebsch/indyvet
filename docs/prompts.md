# Planning
Rewrite an approved phase plan as a concise checklist that another coding agent can execute without making product or architectural decisions. Ask clarifying questions as needed. Visual rules: `docs/visual-system.md`.

# Execution
Implement the approved checklist. Stop and report back instead of guessing if a core assumption in the plan is false or if you are uncertain of the correct thing to do. At the end report files changed, tests and commands run, any deviations from the plan, anything that still needs review.

# Review
Review the implementation against the approved plan. Verify correctness of implementation as well as whether the tests meaningfully verify behavior. Do not modify files yet. Return findings ordered by severity. Avoid style-only comments unless they affect maintainability.
