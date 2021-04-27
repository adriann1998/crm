export function filterQuotes(req, quotes) {
  const userId = req.user._id;
  const role = req.user.role;
  if (role === "admin") return quotes
  return quotes.filter(q => {
    const prospectHolder = q.prospect.prospectHolder;
    const superiors = prospectHolder.superiorHierarchy.map(s => String(s));
    return superiors.includes(String(userId)) || String(prospectHolder._id) === String(userId);
  })
}
