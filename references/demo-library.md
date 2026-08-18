# Simular Demo Library

## Default source

- Spreadsheet: `https://docs.google.com/spreadsheets/d/13N8DBZCl0M4lInCC7hMcGjlRJPM1VMH6oyv9jzZWDeU/edit?gid=1116513175#gid=1116513175`
- Spreadsheet ID: `13N8DBZCl0M4lInCC7hMcGjlRJPM1VMH6oyv9jzZWDeU`
- Tab: `Cases`
- Tab gid: `1116513175`

## Frame field mapping

| Column | Sheet header | Frame field |
|---|---|---|
| A | Industry | Industry |
| B | Scenario | Demo |
| C | Task Description | Description |

Other known columns are Capability Tags, Suggested Self-Hosted App, Fallback Method, Status, Standard Prompts, Demo Video, VM, Note, and EDB Match. Do not place them in the frame.

## Read procedure

1. Read spreadsheet metadata to confirm the `Cases` tab.
2. Read `Cases!A1:C1` to confirm the headers.
3. If the user gives a row number, read only `Cases!A{row}:C{row}`.
4. If the user gives a case or industry instead of a row number, search a bounded relevant range, identify matching row(s), and use columns A:C.
5. If multiple rows match, show the small set of matches and ask only when choosing would materially change the result.
6. Never edit the Demo Library while generating frames.

Use current sheet values every time; do not rely on values remembered from a previous run.
