var members = [];

function addMember(arr) {
    var [memberName, memberNo, memberId, memberPlan] = arr;
    
    var memberJson = {
        "id": memberId,
        "auth": {
            "email": `${memberName.toLowerCase().replace(/\s+/g, '')}@example.com`
        },
        "createdAt": new Date().toISOString(),
        "metaData": {},
        "customFields": {
            "over-18": "true",
            "member-no": memberNo,
            "first-name": memberName,
            "breaker-referral": "Other"
        },
        "permissions": [],
        "loginRedirect": null,
        "verified": false,
        "lastLogin": new Date().toISOString(),
        "profileImage": null,
        "planConnections": [{
            "id": `con_${Math.random().toString(36).substr(2, 16)}`,
            "active": true,
            "status": "ACTIVE",
            "planId": `pln_${memberPlan.toLowerCase().replace(/\s+/g, '-')}`,
            "planName": memberPlan,
            "type": "SUBSCRIPTION",
            "payment": {
                "stripeSubscriptionId": `sub_${Math.random().toString(36).substr(2, 16)}`,
                "amount": (Math.random() * (100 - 10) + 10).toFixed(2),
                "currency": "aud",
                "status": "PAID",
                "lastBillingDate": Math.floor(Date.now() / 1000),
                "nextBillingDate": Math.floor(Date.now() / 1000) + 2592000,
                "cancelAtDate": null,
                "pauseCollection": null,
                "pauseResumeAt": null
            }
        }]
    };
    
    members.push(memberJson);
    console.log(`Member ${memberName} added successfully.`);
}

// Example Usage:
addMember(["Charlie Munger", "20", "mem289798_12", "GOAT"]);
addMember(["LeBron James", "1", "mem_001", "GOAT"]);
addMember(["Michael Jordan", "2", "mem_002", "GOAT"]);
addMember(["Kobe Bryant", "3", "mem_003", "GOAT"]);
addMember(["Shaquille O'Neal", "4", "mem_004", "GOAT"]);
addMember(["Tim Duncan", "5", "mem_005", "GOAT"]);
addMember(["Kevin Durant", "6", "mem_006", "Draft Pick"]);
addMember(["Stephen Curry", "7", "mem_007", "Draft Pick"]);
addMember(["Luka Dončić", "8", "mem_008", "Draft Pick"]);
addMember(["Zion Williamson", "9", "mem_009", "Draft Pick"]);
addMember(["Victor Wembanyama", "10", "mem_010", "Draft Pick"]);
