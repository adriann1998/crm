export function filterContacts(req, contacts) {
  const userId = req.user._id;
  const role = req.user.role;
  if (role === "admin") return contacts;
  return contacts.filter(contact => {
    const accHolder = contact.account.accHolder
    const superiors = accHolder.superiorHierarchy.map(s => String(s));
    return superiors.includes(String(userId)) || String(accHolder._id) === String(userId);
  })
}
