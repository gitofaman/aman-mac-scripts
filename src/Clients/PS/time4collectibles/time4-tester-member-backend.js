var getNewRandomIndex = (previousIndices, limit) => {
    // Check if all possible indices are already in previousIndices
    if (previousIndices.length >= limit) {
        return -1; // No new index possible
    }

    let newIndex;

    // Generate a new random index until it's not in the previousIndices array
    do {
        newIndex = Math.floor(Math.random() * limit);
    } while (previousIndices.includes(newIndex));

    return newIndex;
};

// this is where new plans can be added for direct affect
const planWeights = {
    "Draft Pick": 1,
    "Rookie": 4,
    "Veteran": 10,
    "Hall of Fame": 20,
    "GOAT": 50
};


function getPrizedWinners(arr, n, l) {
    // Filter out members that don't have an active plan and whose member-no exceeds the limit l
    let eligibleMembers = arr.filter(member => {
        const planConnection = member.planConnections && member.planConnections.find(pc => pc.active);
        const memberNo = parseInt(member.customFields["member-no"], 10);
        return planConnection && memberNo <= l;
    });

    // Expand the eligible members based on their plan
    let weightedMembers = [];

    eligibleMembers.forEach(member => {
        const planName = member.planConnections.find(pc => pc.active).planName;
        let weight = planWeights[planName] || 1; // Default to 1 if plan not found

        // Add the member multiple times based on the weight
        for (let i = 0; i < weight; i++) {
            weightedMembers.push(member);
        }
    });

    // Function to randomly pick winners
    let winners = [];
    var previousIndices = []
    while (winners.length < n && weightedMembers.length > 0) {
        var randomIndex = getNewRandomIndex(previousIndices, weightedMembers.length)
        previousIndices.push(randomIndex)
        const winner = weightedMembers[randomIndex];
        //getting winner ready to take in the prizes
        winner.customFields.winner = []
        // Add the winner to the winners list
        winners.push(winner);
    }
    winners.forEach((w, i) => {
        w.customFields.winner.push(i + 1)
    })
    return winners;
}