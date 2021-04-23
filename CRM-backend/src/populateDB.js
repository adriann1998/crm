//Import packages
const mongoose = require('mongoose');
const crypto = require('crypto');

//Configure MongoDB
const Account = require('./models/account');
const Contact = require('./models/contact');
const Department = require('./models/department');
const Prospect = require('./models/prospect');
const Quote = require('./models/quote');
const User = require('./models/user');
const department = require('./models/department');

// Connection URL
const dbName = 'CRM';
const url = "mongodb://localhost:27017/" + dbName;

//Connect to mongoDB server
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    function (err, client) {
        if (err) {
            console.log("Err  ", err);
        } else {
            console.log("-------Connected successfully to server---------");
            generateDepartmentsDummyData(); // generates deparments, then users, then insertDirector
            generateAccountsDummyData();    // generates accounts, then prospects, then contacts, then quotes
        }
});

// hash function
require('dotenv').config();
const hash = (string) => {
  return (crypto
    .createHmac('sha256', "CS0Faafvlljbmrt83N1415AFAdfD83FAfllvaddcaCSI23432C20acgswASDFFKA")
    .update(string)
    .digest('hex')
  );
};

// random data and its generator
const firstNames = ["Oliver", "Noah", "Jack", "Taylor", "Amelia", "Olivia", "Islah", "Leo", "Lucas", "Henry", "Zoe", "Sophia", "Mia", "Grace", "Ava"];
const lastNames = ["Yang", "Li", "Smith", "Jones", "Williams", "Brown", "Nguyen", "Taylor", "Lee", "Harris", "Miller", "Davis", "Thomas", "Taylor", "Jackson", "White", "Clark", "Lewis"];
const titles = ["sales representative", "marketing", "engineer", "director", "financier"];
const mobiles = ["+61425252142","+61423512345","+61434099942","+61412378043","+61433419974","+61435249972","+61498734645","+61455599932"];
const dobs = ["1998-04-09", "2000-06-17", "2007-09-22", "1968-08-26", "1968-02-13"];
const streets = ['511 Waverly Road', '12 Mountain Court', '11 Bang Avenue', '1 Bluff Road', '12 Kent Road', '99 Borthers Street'];
const cities = ['Melbourne', 'Sydney', 'Wollogong', 'Jakarta', 'PyongYang', 'Bandung', 'Tokyo'];
const states = ['VIC','SA','TAS','NSW','QLD','NT','WA'];
const postcodes = ['3111','3123','3150','2311','4123','3000','3001','4322','4000','4111'];
const prices = [1000000000,1200000000,1500000000,1750000000,1600000000,2000000000,2300000000,1700000000,1800000000];
const roles = ['am', 'bm', 'director'];

const getRandomFirstName = () => {return firstNames[Math.floor(Math.random() * firstNames.length)]};
const getRandomLastName = () => {return lastNames[Math.floor(Math.random() * lastNames.length)]};
const getRandomTitle = () => {return titles[Math.floor(Math.random() * titles.length)]};
const getRandomPhone = () => {return mobiles[Math.floor(Math.random() * mobiles.length)]};
const getRandomDOB = () => {return dobs[Math.floor(Math.random() * dobs.length)]};
const getRandomStreet = () => {return streets[Math.floor(Math.random() * streets.length)]};
const getRandomCity = () => {return cities[Math.floor(Math.random() * cities.length)]};
const getRandomState = () => {return states[Math.floor(Math.random() * states.length)]};
const getRandomPostcode = () => {return postcodes[Math.floor(Math.random() * postcodes.length)]};
const getRandomPrice = () => {return prices[Math.floor(Math.random() * prices.length)]};
const getRandomRole = () => {return roles[Math.floor(Math.random() * roles.length)]};
const getRandomNumber = (min, max) => { return Math.random() * (max - min) + min; };
const getRandomDate = (date1, date2) => {
    function randomValueBetween(min, max) {
      return Math.random() * (max - min) + min;
    }
    var date1 = date1 || '01-01-1970'
    var date2 = date2 || new Date().toLocaleDateString()
    date1 = new Date(date1).getTime();
    date2 = new Date(date2).getTime();
    return date1>date2 ? 
        new Date(randomValueBetween(date2,date1)).toLocaleString('en-GB').substring(0,10) : 
        new Date(randomValueBetween(date1, date2)).toLocaleString('en-GB').substring(0,10)  
};
const getRandomPayment = () => {
    const paymentDetails = 
    {
        downPayment: {
            amount: Math.floor(getRandomNumber(10,15))*1000000,
            paymentTime: 0
        },
        onDelivery: {
            amount: Math.floor(getRandomNumber(50,55))*1000000,
            paymentTime: Math.round(getRandomNumber(1,3))
        },
        userAcceptanceTest: {
            amount: Math.floor(getRandomNumber(1,5))*1000000,
            paymentTime: Math.round(getRandomNumber(3,4))
        },
        afterUATGuarantee: {
            amount: Math.floor(getRandomNumber(1,5))*1000000,
            paymentTime: 12
        },
        monthlyInstallment: {
            amount: 700000,
            period: 60,
            frequency: 1
        },
        yearlyInstallment: {
            amount: 7000000,
            period: 5,
            frequency: 12
        }
    }
    let total = 0;
    total += parseFloat(paymentDetails.downPayment.amount);
    total += parseFloat(paymentDetails.onDelivery.amount);
    total += parseFloat(paymentDetails.userAcceptanceTest.amount);
    total += parseFloat(paymentDetails.afterUATGuarantee.amount);
    total += parseFloat(paymentDetails.yearlyInstallment.amount) * parseFloat(paymentDetails.yearlyInstallment.period);
    total += parseFloat(paymentDetails.monthlyInstallment.amount) * parseFloat(paymentDetails.monthlyInstallment.period);
    return [paymentDetails, total]
}

const generateDepartmentsDummyData = () => {
    // list of departments
    const departments = [
        {departmentName: 'Sales'},
        {departmentName: 'Marketing'},
        {departmentName: 'Finance'},
        {departmentName: 'A.I'}
    ];
    // drop table
    Department.deleteMany({}, (err, res) => {
        if (err) { console.log(err); return };
        console.log("Deleted DEPARTMENTS");
        // insert data
        Department.insertMany(departments, (err, res) => {
            if (err) { console.log(err); return };
            console.log("Inserted DEPARTMENTS");
            generateUserDummyData();
        });
    });
};

const generateAccountsDummyData = () => {
    // list of accounts
    const accounts = [
        {accName: "ABB Sakti Industri, Pt", accAlias:"ABB"},
        {accName: "Accenture, Pt", accAlias:"ACC"},
        {accName: "Adaro Energy Tbk, Pt", accAlias:"ADRO"},
        {accName: "Aero System Indonesia", accAlias:"ASI"},
        {accName: "Akademik Kepolisian", accAlias:"AKPOL"},
        {accName: "All Data International"},
        {accName: "XL Axita Tbk, Pt", accAlias:"EXCL"},
        {accName: "WIKA WEB"},
        {accName: "Transportasi Gas Indonesia, Pt", accAlias:"TGI"},
        {accName: "Toba Bara Sejahtera", accAlias:"TOBA"},
        {accName: "Telkom Telstra", accAlias:"TELKOM"},
        {accName: "Kogan.com Pty Ltd", accAlias:"KGN"},
        {accName: "Qantas Airways", accAlias:"QAN"},
        {accName: "Myer Holdings Group", accAlias:"MYR"},
        {accName: "XERO", accAlias:"XERO"},
        {accName: "CarDeals", accAlias:"CAR"},
        {accName: "AGL Energy", accAlias:"AGL"},
        {accName: "Afterpay Ltd", accAlias:"AFP"},
        {accName: "IPH Ltd", accAlias:"IPH"},
        {accName: "Metcash Ltd", accAlias:""},
        {accName: "Mirvac Group", accAlias:"MGR"},
        {accName: "Mcquaire Group", accAlias:"MQG"},
        {accName: "Nufarm Ltf", accAlias:"NUF"},
        {accName: "Origin Energy", accAlias:"ORG"}
    ];
    // drop table
    Account.deleteMany({}, (err, res) => {
        if (err) { console.log(err); return };
        console.log("Deleted ACCOUNTS");
        // insert data
        Account.insertMany(accounts, (err, res) => {
            if (err) { console.log(err); return };
            console.log("Inserted ACCOUNTS");
            generateProspectDummyData();
            generateContactDummyData();
        });
    });
};

const generateContactDummyData = () => {
    // list of contacts
    Account.find({}, (err, accounts) => {
        const getRandomAccId  = () => {return accounts[Math.floor(Math.random() * accounts.length)]._id};
        const N = 80;
        let contacts = [];
        for (var i = 0; i < N; i++) {
            let newItem = {
                name: {firstName: getRandomFirstName(), lastName: getRandomLastName()},
                account: getRandomAccId(), contactTitle: getRandomTitle(), contactEmail: `email${N}@company.co.au`,
                contactPhone: {mobile: getRandomPhone(), work: getRandomPhone(), office: getRandomPhone()}
            }
            contacts.push(newItem);
        }
        // drop table
        Contact.deleteMany({}, (err, res) => {
            if (err) { console.log(err); return };
            console.log("Deleted CONTACTS");
            // insert data
            Contact.insertMany(contacts, (err, res) => {
                if (err) { console.log(err); return };
                console.log("Inserted CONTACTS");
            });
        });
    })
}

const generateProspectDummyData = () => {
    // list of prospects
    Account.find({}, (err, accounts) => {
        const endUser = [undefined,"XL", "Axita", "Telstra", "Alibaba"]
        const getRandomEndUser = () => {return endUser[Math.floor(Math.random() * endUser.length)]};
        const getRandomAccId  = () => {return accounts[Math.floor(Math.random() * accounts.length)]._id};
        let prospects = [];
        for (let i=0; i<80; i++) {
            const payment = getRandomPayment();
            const paymentDetails = payment[0];
            const prospectAmount = payment[1];
            let randomDate = getRandomDate('01/01/2021','12/31/2028').split('/');
            randomDate = `${randomDate[2]}-${randomDate[1]}-${randomDate[0]}`
            const newProspect = {
                                prospectName: `prospect ${i}`, account: getRandomAccId(), prospectAmount: prospectAmount,
                                endUser: getRandomEndUser(), GPM: 45, expectedSODate: randomDate, desc:"", payment: paymentDetails
                                };
            prospects.push(newProspect);
        };
        // drop table
        Prospect.deleteMany({}, (err, res) => {
            if (err) { console.log(err); return };
            console.log("Deleted PROSPECTS");
            // insert data
            Prospect.insertMany(prospects, (err, res) => {
                if (err) { console.log(err); return };
                console.log("Inserted PROSPECTS");
                generateQuoteDummyData();
            });
        });
    });
};

const generateQuoteDummyData = () => {
    // list of quotes
    Prospect.find({}, (err, prospects) => {
        User.find({}, (err, users) => {
            const descriptions = ["","waiting for customer confirmation", "price too high", "still negotiating price", "customer not happy", "customer happy with the item, but not with price", "customer interested, needs another call", "field inspection required"];
            const getRandomDescription = () => {return descriptions[Math.floor(Math.random() * descriptions.length)]}
            const getRandomUserId = () => {return users[Math.floor(Math.random() * users.length)]}
            const getRandomProspectId = () => {return prospects[Math.floor(Math.random() * prospects.length)]}
            let quotes = []
            for (let i = 0; i <140; i++) {
                const newQuote = {
                    prospect: getRandomProspectId(), 
                    user: getRandomUserId(), 
                    amountQuoted: getRandomPrice() ,
                    desc: getRandomDescription()
                };
                quotes.push(newQuote)
            }
            // drop table
            Quote.deleteMany({}, (err, res) => {
                if (err) { console.log(err); return };
                console.log("Deleted QUOTES");
                // insert data
                Quote.insertMany(quotes, (err, res) => {
                    if (err) { console.log(err); return };
                    console.log("Inserted QUOTES");
                });
            });
        })
    })
}

const generateUserDummyData = () => {
    // list of users
    Department.find({}, (err, departments) => {
        const N = 50;
        let users = [];
        for (let i = 0; i < N; i++) {
            let departmentId = departments[Math.floor(Math.random() * departments.length)]._id;
            let newUser = {
                userEmail: `email${i}@compnet.com`, password: hash("compnet"), 
                NIK: i.toString().padStart(11, "0"), userDOB: getRandomDOB(),
                name: {firstName: getRandomFirstName(), lastName: getRandomLastName()},
                userPhone: {mobile1: getRandomPhone(), mobile2: getRandomPhone(), work: getRandomPhone()},
                userPosition: getRandomRole(), reportTo: null,
                department: departmentId, 
                userAddress: {
                    street: getRandomStreet(), city: getRandomCity(), state: getRandomState(), postcode: getRandomPostcode()
                },
                userStatus: true
            }
            users.push(newUser);
        }
        // drop table
        User.deleteMany({}, (err, res) => {
            if (err) { console.log(err); return };
            console.log("Deleted USERS");
            // insert data
            User.insertMany(users, (err, res) => {
                if (err) { console.log(err); return };
                console.log("Inserted USERS");
                insertDirectorDummyData();
            });
        });
    })
}

const insertDirectorDummyData = () => {
    User.find({userPosition: { $eq: 'director' }}, (err, users) => {
        Department.find({}, (err, departments) => {
            let i = 0;
            departments.forEach(department => {
                const theFilter = {_id: department._id};
                const theUpdate = {$set: {director: users[i]._id}}
                Department.findOneAndUpdate(theFilter, theUpdate, (err, department) => {
                    if (err) { console.log(err)}
                })
                i++;
            })
        });
    });
}