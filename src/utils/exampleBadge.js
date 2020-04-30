const localBadge = "/b/MichMenn3909";
const prodBadge = "/b/ExamBadg941"
const exampleBadge = process.env.NODE_ENV === 'production' ? prodBadge : localBadge;
export default exampleBadge;