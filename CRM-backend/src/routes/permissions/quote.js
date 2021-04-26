const User = require("../../models/user");
const Quote = require("../../models/quote");

const getSubsidariesEmails = (userEmail, users) => {
  let emails = new Set();
  let openSet = new Set();
  openSet.add(userEmail);
  emails.add(userEmail);
  users
    .filter(
      (u) => u.reportTo?.userEmail === userEmail && u.userPosition !== "am"
    )
    .forEach((u) => {
      openSet.add(u.userEmail);
    });
  Array.from(openSet).forEach((email) => {
    users
      .filter((u) => u.reportTo?.userEmail === email)
      .forEach((u) => {
        emails.add(u.userEmail);
      });
  });
  return Array.from(emails);
};

const filterQuote = (quotes, role, userEmail) => {
  switch (role) {
    case "admin":
      return quotes;
    case "director":
    case "bm":
      User.find({})
        .populate("reportTo", "userEmail")
        .exec(function (err, users) {
          const emails = getSubsidariesEmails(userEmail, users);
          return quotes.filter((q) => emails.includes(q.user.userEmail));
        });
    case "am":
      return quotes.filter((q) => q.user.userEmail === userEmail);
    default:
      return [];
  }
};

export function filteredQuotes(req, quotes) {
  console.log(req.user)
  const role = req.user.role;
  const userEmail = req.user.userEmail;
  // const filteredQuotes = filterQuote(quotes, role, userEmail);
  const filteredQuotes =
    role === "admin" ? quotes : quotes.filter((q) => q.user.userEmail === userEmail);
  return filteredQuotes;
}

// export async function canUpdateQuote(req) {
// 	const quoteId = req.params.id;
// 	const userEmail = req.user.userEmail;
// 	return Quote.findOne({_id: quoteId})
// 			 .populate('user', 'userEmail')
// 			 .exec((err, quote) => {
// 					if (err) return false;
// 					if (quote.user.userEmail !== userEmail) return false;
// 					return true
// 				})
// }
