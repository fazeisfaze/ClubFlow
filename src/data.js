export const sampleAvailability = [{ date: '2026-11-07', start: '09:00', end: '11:00' }];
export const scheduleDefaults = { date: '2026-11-07', duration: 20, windowStart: '09:00', windowEnd: '11:00' };

export const campaignDefaults = {
  name: 'Tuyển thành viên Câu lạc bộ 2026',
  club: 'CLB Sáng tạo Sinh viên',
  description: 'Tìm kiếm những thành viên mới cùng xây dựng các dự án sáng tạo trong năm học 2026–2027.',
  opensAt: '2026-10-01',
  closesAt: '2026-10-30',
  instructions: 'Chuẩn bị CV PDF và chọn vị trí phù hợp. Mỗi vị trí cần một hồ sơ riêng.',
  state: 'Published',
  interviewDate: '2026-11-07',
  departments: [
    { id: 'content', name: 'Nội dung', positions: [{ id: 'content-creator', title: 'Content Creator', quota: 3, description: 'Sáng tạo nội dung cho các kênh của CLB.', requirements: 'Viết tiếng Việt tốt, có tinh thần học hỏi.' }] },
    { id: 'comms', name: 'Truyền thông', positions: [{ id: 'communications', title: 'Communications', quota: 2, description: 'Hỗ trợ truyền thông và tổ chức hoạt động.', requirements: 'Giao tiếp tốt, chủ động phối hợp nhóm.' }] },
  ],
};

export const applicationDefaults = [
  { id: 'A01', applicantId: 'applicant-an', applicant: 'An Nguyễn', position: 'Content Creator', department: 'Nội dung', submittedAt: '2026-10-12 09:14', status: 'Shortlisted', cv: 'An_Nguyen_CV.pdf', cvEducation: 'Truyền thông đa phương tiện · Năm 2', cvExperience: 'Cộng tác viên nội dung cho fanpage khoa; viết bài recap sự kiện.', cvSkills: 'Viết nội dung · Canva · Lập kế hoạch bài đăng', statement: 'Mình yêu thích kể chuyện bằng nội dung số và đã tham gia truyền thông cho các hoạt động sinh viên.', note: '' },
  { id: 'A02', applicantId: 'applicant-an', applicant: 'An Nguyễn', position: 'Communications', department: 'Truyền thông', submittedAt: '2026-10-12 09:21', status: 'Shortlisted', cv: 'An_Nguyen_Comms_CV.pdf', cvEducation: 'Truyền thông đa phương tiện · Năm 2', cvExperience: 'Hỗ trợ điều phối hai hoạt động tình nguyện của khoa.', cvSkills: 'Giao tiếp · Điều phối sự kiện · Làm việc nhóm', statement: 'Mình muốn phát triển kỹ năng truyền thông và phối hợp tổ chức sự kiện.', note: '' },
  { id: 'A03', applicantId: 'applicant-bao', applicant: 'Bảo Trần', position: 'Content Creator', department: 'Nội dung', submittedAt: '2026-10-14 13:05', status: 'Shortlisted', cv: 'Bao_Tran_CV.pdf', cvEducation: 'Marketing · Năm 3', cvExperience: 'Quản trị nội dung cho dự án truyền thông sinh viên trong một học kỳ.', cvSkills: 'Copywriting · Canva · Phân tích tương tác', statement: 'Mình có kinh nghiệm viết bài và thiết kế nội dung cho fanpage của khoa.', note: '' },
  { id: 'A04', applicantId: 'applicant-chi', applicant: 'Chi Lê', position: 'Communications', department: 'Truyền thông', submittedAt: '2026-10-16 10:42', status: 'Shortlisted', cv: 'Chi_Le_CV.pdf', cvEducation: 'Quan hệ công chúng · Năm 2', cvExperience: 'Thành viên ban tổ chức ngày hội câu lạc bộ tại trường.', cvSkills: 'Lập kế hoạch · Giao tiếp · Điều phối', statement: 'Mình thích làm việc nhóm, lập kế hoạch nội dung và kết nối cộng đồng.', note: '' },
  { id: 'A05', applicantId: 'applicant-dung', applicant: 'Dũng Phạm', position: 'Content Creator', department: 'Nội dung', submittedAt: '2026-10-18 16:30', status: 'Shortlisted', cv: 'Dung_Pham_CV.pdf', cvEducation: 'Ngôn ngữ Anh · Năm 1', cvExperience: 'Viết bản tin tháng cho dự án cộng đồng của sinh viên.', cvSkills: 'Viết ngắn · Biên tập · Tiếng Anh', statement: 'Mình có thể viết nội dung ngắn, rõ ràng và muốn học thêm về sản xuất truyền thông.', note: '' },
  { id: 'A06', applicantId: 'applicant-emma', applicant: 'Emma Đỗ', position: 'Communications', department: 'Truyền thông', submittedAt: '2026-10-20 08:50', status: 'Rejected', cv: 'Emma_Do_CV.pdf', cvEducation: 'Quản trị kinh doanh · Năm 2', cvExperience: 'Tham gia các hoạt động ngoại khóa của lớp.', cvSkills: 'Làm việc nhóm · Thuyết trình', statement: 'Mình quan tâm đến các hoạt động cộng đồng và truyền thông.', note: 'Chưa phù hợp yêu cầu vị trí.' },
];

applicationDefaults.forEach((application) => {
  application.positionId = application.position === 'Content Creator' ? 'content-creator' : 'communications';
  application.availability = structuredClone(sampleAvailability);
});

export const interviewerDefaults = [
  { id: 'interviewer-mai', name: 'Ngọc Mai', positions: ['Content Creator'], availableFrom: '09:00', availableTo: '11:00' },
  { id: 'interviewer-bao', name: 'Quốc Bảo', positions: ['Communications'], availableFrom: '09:00', availableTo: '11:00' },
  { id: 'interviewer-linh', name: 'Thu Linh', positions: ['Content Creator', 'Communications'], availableFrom: '09:00', availableTo: '11:00' },
];

export const roomDefaults = [
  { id: 'room-c101', name: 'Phòng C101' },
  { id: 'room-c102', name: 'Phòng C102' },
];

interviewerDefaults.forEach((interviewer) => {
  interviewer.positionIds = interviewer.positions.map((position) => position === 'Content Creator' ? 'content-creator' : 'communications');
  interviewer.availability = structuredClone(sampleAvailability);
});
roomDefaults.forEach((room) => { room.availability = structuredClone(sampleAvailability); });

export const assignmentDefaults = [
  { id: 'I01', applicationId: 'A01', applicantId: 'applicant-an', applicant: 'An Nguyễn', position: 'Content Creator', interviewerId: 'interviewer-mai', interviewer: 'Ngọc Mai', roomId: 'room-c101', room: 'Phòng C101', date: '2026-11-07', start: '09:00', end: '09:20', status: 'Conflict', conflicts: ['applicant'] },
  { id: 'I02', applicationId: 'A02', applicantId: 'applicant-an', applicant: 'An Nguyễn', position: 'Communications', interviewerId: 'interviewer-bao', interviewer: 'Quốc Bảo', roomId: 'room-c102', room: 'Phòng C102', date: '2026-11-07', start: '09:10', end: '09:30', status: 'Conflict', conflicts: ['applicant'] },
  { id: 'I03', applicationId: 'A03', applicantId: 'applicant-bao', applicant: 'Bảo Trần', position: 'Content Creator', interviewerId: 'interviewer-linh', interviewer: 'Thu Linh', roomId: 'room-c102', room: 'Phòng C102', date: '2026-11-07', start: '09:30', end: '09:50', status: 'Proposed', conflicts: [] },
  { id: 'I04', applicationId: 'A04', applicantId: 'applicant-chi', applicant: 'Chi Lê', position: 'Communications', interviewerId: '', interviewer: '', roomId: '', room: '', date: '2026-11-07', start: '', end: '', status: 'Unassigned', reason: 'Chưa gán đủ giờ, người phỏng vấn và phòng.', conflicts: [] },
  { id: 'I05', applicationId: 'A05', applicantId: 'applicant-dung', applicant: 'Dũng Phạm', position: 'Content Creator', interviewerId: 'interviewer-mai', interviewer: 'Ngọc Mai', roomId: 'room-c101', room: 'Phòng C101', date: '2026-11-07', start: '10:00', end: '10:20', status: 'Proposed', conflicts: [] },
];

export function createInitialState() {
  return {
    campaign: structuredClone(campaignDefaults),
    applications: structuredClone(applicationDefaults),
    assignments: structuredClone(assignmentDefaults),
    scheduleSettings: structuredClone(scheduleDefaults),
    draftSettings: structuredClone(scheduleDefaults),
    confirmed: false,
    selectedApplicationId: 'A01',
    applicationsClosed: true,
  };
}

export function hydrateState(saved) {
  const initial = createInitialState();
  return { ...initial, ...saved,
    scheduleSettings: { ...scheduleDefaults, date: saved.campaign.interviewDate || scheduleDefaults.date, ...saved.scheduleSettings },
    draftSettings: { ...scheduleDefaults, date: saved.campaign.interviewDate || scheduleDefaults.date, ...saved.draftSettings },
    applications: saved.applications.map((application) => {
      const fixture = applicationDefaults.find((item) => item.id === application.id && item.applicantId === application.applicantId);
      return { ...fixture, ...application, availability: application.availability ?? fixture?.availability ?? [] };
    }),
  };
}
