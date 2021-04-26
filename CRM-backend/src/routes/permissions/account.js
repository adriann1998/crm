export function filterAccounts(req, accounts) {
  const userId = req.user._id;
  const role = req.user.role;
	if (role === "admin") return accounts;
	return accounts.filter(acc => {
		const superiors = acc.accHolder.superiorHierarchy.map(s => String(s));
		return superiors.includes(String(userId)) || String(acc.accHolder._id) === String(userId);
	})
}