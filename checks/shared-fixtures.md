# Shared campaign and sample fixtures

Use these same values on each screen to prevent cross-page date and identity contradictions.

- Campaign: **Tuyển thành viên Câu lạc bộ 2026**
- Host: **CLB Sáng tạo Sinh viên**
- Applications open: **2026-10-01**
- Applications close: **2026-10-30**
- Interview date: **2026-11-07** (after applications close)
- Sample application IDs: A01–A06; A01 and A02 belong to the same applicant (An Nguyễn) but
  different positions.
- Applicants: An Nguyễn, Bảo Trần, Chi Lê, Dũng Phạm, Emma Đỗ.
- Interviewers: Ngọc Mai, Quốc Bảo, Thu Linh. These identities are distinct from all applicants.
- Rooms: Phòng C101 and Phòng C102.
- Interview duration: 20 minutes in the initial sample; allowed choices are 15, 20, or 30.
- Each application has a stable position ID and explicit applicant availability on
  **2026-11-07, 09:00–11:00**. Both applications belonging to An share that available window.
- The three interviewers and two rooms have explicit availability on the same date/window.
  Qualifications also use stable position IDs, so renaming a position does not invalidate
  a qualified interviewer's assignment.
- Selected scheduling settings and the settings used to create the draft are persisted
  separately. Their initial values are Nov 7, 20 minutes, 09:00–11:00.
- Initial schedule: A01 09:00–09:20 with Ngọc Mai/C101; A02 09:10–09:30 with Quốc Bảo/C102
  is a genuine applicant overlap; A03 begins at 09:30 and does not overlap A02; A04 is
  Unassigned with a reason; A05 10:00–10:20 with Ngọc Mai/C101.
- Initial schedule totals: 2 Proposed, 2 Conflict (both rows in the genuine applicant overlap),
  1 Unassigned = 5 rows.
