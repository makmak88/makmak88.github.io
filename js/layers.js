addLayer("A", {
    name: "Achievments", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Ach", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFF00",
    requires: new Decimal("e1e-9999"), // Can be a function that takes requirement increases into account
    resource: "Clicks", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "N/A", description: "None: Reset for Acheviments (Ha)", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    achievements: {
        11: {
            name: "Clicker",
            goalTooltip:"Get 10 Clicks",
            doneTooltip:"You got 10 Clicks",
            done() { return player.A.points.gte(10) }
        },
        12: {
            name: "Row 2",
            goalTooltip:"Unlock Rebirths",
            doneTooltip:"You got to row 2 and got Rebirths!",
            effect() { return player.p.points.mult = mult.times("100")},
            done() { return player.R.points.gte(1) }
        },
    }
})

addLayer("Admin", {
    name: "ADMIN", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ADM", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "Red",
    requires: new Decimal("69420"), // Can be a function that takes requirement increases into account
    resource: "Admin Upgrades Bought", // Name of prestige currency
    baseResource: "Admin Upgrades Bought", // Name of resource prestige is based on
    baseAmount() {return player[this.layer].points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "N/A", description: "None: Reset for ADMIN? (Ha)", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    upgrades: {
        11: {
            title: "Inf Pointer",
            description: "x??? Points",
            cost: new Decimal(-1),
        },

        12: {
            title: "INF PRE",
            description: "x??? PP",
            cost: new Decimal(-1),
        },
    }

})

addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    branches: ["C"],
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('Admin', 12)) mult = mult.times("eeeeeeeeeeeeeeeeeeeeeeeeeeeee9e9")
        if (hasUpgrade('C', 13)) mult = mult.times("2")
        if (hasUpgrade('C', 14)) mult = mult.times("10")
        if (hasUpgrade('p', 13)) mult = mult.times("100")
        if (hasUpgrade('C', 16)) mult = mult.times("50")
        if (hasUpgrade('co', 12)) mult = mult.times("1e3")
        if (hasUpgrade('E', 11)) mult = mult.times("100")
        if (hasUpgrade('R', 11)) mult = mult.times("150")
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    passiveGeneration(){
        unlock = 0
        if (hasMilestone('R', 0)) unlock = 0.3
        if (hasMilestone('R', 1)) unlock = 1
        return unlock
    },

    upgrades: {
        11: {
            title: "Double Up",
            description: "x2 Points",
            cost: new Decimal(1),
        },

        12: {
            title: "Triple Up",
            description: "x3 Points",
            cost: new Decimal(3),
        },

        13: {
            title: "Self-Multiply",
            description: "x100 PP",
            cost: new Decimal(100),
            unlocked() { 
                unlock = false
                if (hasUpgrade('C', 15)) unlock = true
                return unlock
            },
        },

        14: {
            title: "Cash Expansion",
            description: "More Cash Upgrades",
            cost: new Decimal(1e5),
            unlocked() { 
                unlock = false
                if (hasUpgrade('C', 15)) unlock = true
                return unlock
            },
        },
    }

})

addLayer("C", {
    name: "Cash", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "Green",
    branches: ["co", "C"],
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Cash", // Name of prestige currency
    baseResource: "Prestige Points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('C', 16)) mult = mult.times("50")
        if (hasUpgrade('co', 11)) mult = mult.times("750")
        if (hasUpgrade('R', 12)) mult = mult.times("250")
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Reset for Cash", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    passiveGeneration(){
        unlock = 0
        if (hasMilestone('R', 1)) unlock = 0.25
        return unlock
    },

    upgrades: {
        11: {
            title: "Quadruple Up",
            description: "x4 Points",
            cost: new Decimal(10),
        },
        12: {
            title: "OOM Your Points",
            description: "x10 Points... It's getting boring really.",
            cost: new Decimal(25),
        },
        13: {
            title: "Prestige Master I",
            description: "x2 PP! Something New.",
            cost: new Decimal(50),
        },
        14: {
            title: "Prestige Master II",
            description: "x10 PP",
            cost: new Decimal(100),
        },
        15: {
            title: "Prestige Expansion",
            description: "Unlock More Prestige Upgrades",
            cost: new Decimal(500),
        },
        16: {
            title: "Prestige + Cash Boost",
            description: "x50 Prestiges and Cash.",
            cost: new Decimal(1e3),
            unlocked() { 
                unlock = false
                if (hasUpgrade('p', 14)) unlock = true
                return unlock
            },
        },
        17: {
            title: "Unlock Coin Layer",
            description: "Unlocks Coin Layer + Coin Upgrades.",
            cost: new Decimal(2.5e5),
            unlocked() { 
                unlock = false
                if (hasUpgrade('p', 14)) unlock = true
                return unlock
            },
        },
    }

})

addLayer("co", {
    name: "Coins", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Co", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "Brown",
    branches: ["E"],
    requires: new Decimal(2.5e5), // Can be a function that takes requirement increases into account
    resource: "Coins", // Name of prestige currency
    baseResource: "Cash", // Name of resource prestige is based on
    baseAmount() {return player.C.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(0)
        if (hasUpgrade('C', 17)) mult = mult.plus("1")
        if (hasUpgrade('co', 14)) mult = mult.times("120")
        if (hasUpgrade('R', 12)) mult = mult.times("10")
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "C", description: "Shift + C: Reset for Coins :)", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    upgrades: {
        11: {
            title: "Cash Boost II",
            description: "x750 Cash",
            cost: new Decimal(15),
            unlocked() { 
                unlock = false
                if (hasUpgrade('C', 17)) unlock = true
                return unlock
            },
        },

        12: {
            title: "Prestige Master III",
            description: "x1e3 PP",
            cost: new Decimal(750),
            unlocked() { 
                unlock = false
                if (hasUpgrade('C', 17)) unlock = true
                return unlock
            },
        },

        13: {
            title: "A new start",
            description: "Unlock Existance Layer",
            cost: new Decimal(1e4),
            unlocked() { 
                unlock = false
                if (hasUpgrade('C', 17)) unlock = true
                return unlock
            },
        },
        14: {
            title: "Coinception",
            description: "x120 Coins",
            cost: new Decimal(1e5),
            unlocked() { 
                unlock = false
                if (hasUpgrade('E', 13)) unlock = true
                return unlock
            },
        },
        15: {
            title: "Existance+",
            description: "Unlock more realities in Existance",
            cost: new Decimal(7.5e6),
            unlocked() { 
                unlock = false
                if (hasUpgrade('E', 13)) unlock = true
                return unlock
            },
        },
    }

}),

addLayer("E", {
    name: "Existance", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "White",
    branches: ["M"],
    requires: new Decimal(1.5e4), // Can be a function that takes requirement increases into account
    resource: "Existance Points", // Name of prestige currency
    baseResource: "Coins", // Name of resource prestige is based on
    baseAmount() {return player.co.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(0)
        if (hasUpgrade('co', 13)) mult = mult.plus("1")
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "E: Reset for Existance Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    upgrades: {
        11: {
            title: "Existing",
            description: "x100 Prestige Points",
            cost: new Decimal(1),
            unlocked() { 
                unlock = false
                if (hasUpgrade('co', 13)) unlock = true
                return unlock
            },
        },
        12: {
            title: "Reality",
            description: "x20 Points",
            cost: new Decimal(50),
            unlocked() { 
                unlock = false
                if (hasUpgrade('co', 13)) unlock = true
                return unlock
            },
        },
        13: {
            title: "The Coin Plane",
            description: "New Coin Upgrades",
            cost: new Decimal(75),
            unlocked() { 
                unlock = false
                if (hasUpgrade('co', 13)) unlock = true
                return unlock
            },
        },
        14: {
            title: "Cash Reality",
            description: "Unlock the Last row 1 Layer",
            cost: new Decimal(75),
            unlocked() { 
                unlock = false
                if (hasUpgrade('co', 15)) unlock = true
                return unlock
            },
        },
        15: {
            title: "Row 2",
            description: "Unlock Row 2",
            cost: new Decimal(0),
            unlocked() { 
                unlock = false
                if (hasUpgrade('M', 11)) unlock = true
                return unlock
            },
        },
    }

})

addLayer("M", {
    name: "Money", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 4, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "Lime",
    branches: ["R"],
    requires: new Decimal(150), // Can be a function that takes requirement increases into account
    resource: "Moners", // Name of prestige currency
    baseResource: "Existance Points", // Name of resource prestige is based on
    baseAmount() {return player.E.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(0)
        if (hasUpgrade('E', 14)) mult = mult.plus("1")
        if (hasUpgrade('R', 12)) mult = mult.times("50")
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for Moners B)", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    upgrades: {
        11: {
            title: "Point Mastery",
            description: "x100 Points (Dont worry this layer will be more useful later on) Check on Existance after buying.",
            cost: new Decimal(25),
            unlocked() { 
                unlock = false
                if (hasUpgrade('E', 14)) unlock = true
                return unlock
            },
        },
    }

})

addLayer("R", {
    name: "Rebirth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "Blue",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "Rebirth Points", // Name of prestige currency
    baseResource: "Existance Points", // Name of resource prestige is based on
    baseAmount() {return player.E.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(0)
        if (hasUpgrade('E', 15)) mult = mult.plus("1")
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "M: Reset for RP", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    upgrades: {
        11: {
            title: "Row 2 Boost",
            description: "150x PP",
            cost: new Decimal(0),
            unlocked() { 
                unlock = false
                if (player.R.points.gte(1)) unlock = true
                return unlock
            },
        },
        12: {
            title: "Cash+",
            description: "x250 Cash, x50 Moners, x10 Coins.",
            cost: new Decimal(5),
            unlocked() { 
                unlock = false
                if (hasUpgrade('R', 11)) unlock = true
                return unlock
            },
        },
        13: {
            title: "Cash+",
            description: "x250 Cash, x50 Moners, x10 Coins.",
            cost: new Decimal(5),
            unlocked() { 
                unlock = false
                if (hasUpgrade('R', 11)) unlock = true
                return unlock
            },
        },
    },
    milestones: {
        0: {
            requirementDescription: "1 Rebirth",
            effectDescription: "Automatically gain 30% of prestige points every second.",
            done() { return player.R.points.gte(1) }
        },
        1: {
            requirementDescription: "3 Rebirth",
            effectDescription: "Automatically gain 100% of prestige points every second and 25% of Cash gain per second.",
            done() { return player.R.points.gte(3) }
        },
    }

})
