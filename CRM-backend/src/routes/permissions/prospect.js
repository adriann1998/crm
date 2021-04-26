export function filterProspects(req, prospects) {
  const userId = req.user._id;
  const role = req.user.role;
  if (role === "admin") return prospects;
  return prospects.filter((p) => {
		const superiors = p.prospectHolder.superiorHierarchy.map(s => String(s));
    return superiors.includes(String(userId)) || String(p.prospectHolder._id) === String(userId);
  });
}
