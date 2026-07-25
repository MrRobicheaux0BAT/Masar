window.QUESTS_DATA = {
  "categories": [
    {
      "id": "main",
      "name": "Main Quest",
      "group": "Main Story",
      "summary": "The Dragonborn prophecy: escape Helgen, learn the Voice, and defeat Alduin."
    },
    {
      "id": "companions",
      "name": "The Companions",
      "group": "Factions",
      "summary": "Join Whiterun's warrior guild, uncover the beast blood, and decide the Circle's fate."
    },
    {
      "id": "college",
      "name": "College of Winterhold",
      "group": "Factions",
      "summary": "Study magic at the College, uncover Saarthal's secrets, and save Winterhold from the Eye of Magnus."
    },
    {
      "id": "thieves_guild",
      "name": "Thieves Guild",
      "group": "Factions",
      "summary": "Restore the Riften underworld, walk Nocturnal's path, and reclaim influence across Skyrim's cities."
    },
    {
      "id": "dark_brotherhood",
      "name": "Dark Brotherhood",
      "group": "Factions",
      "summary": "Serve Sithis as an assassin—or wipe the Brotherhood out.",
      "exclusiveNote": "Mutually exclusive starts: complete With Friends Like These… to join, or kill Astrid during that quest to begin Destroy the Dark Brotherhood!"
    },
    {
      "id": "imperial",
      "name": "Imperial Legion",
      "group": "Civil War",
      "summary": "Swear to the Empire and reconquer Skyrim for the Legion.",
      "exclusiveNote": "Joining the Legion locks out the Stormcloak campaign (exclusiveGroup: civil-war)."
    },
    {
      "id": "stormcloaks",
      "name": "Stormcloaks",
      "group": "Civil War",
      "summary": "Fight for Ulfric and free Skyrim from Imperial rule.",
      "exclusiveNote": "Joining the Stormcloaks locks out the Imperial campaign (exclusiveGroup: civil-war)."
    },
    {
      "id": "daedric",
      "name": "Daedric Quests",
      "group": "Daedric",
      "summary": "Quests tied to the Daedric Princes and their artifacts."
    },
    {
      "id": "bards",
      "name": "Bards College",
      "group": "Factions",
      "summary": "Join Solitude's Bards College and recover lost instruments."
    },
    {
      "id": "dawnguard",
      "name": "Dawnguard",
      "group": "DLC",
      "summary": "Dawnguard DLC: hunt vampires—or join them—and stop Harkon's prophecy.",
      "exclusiveNote": "After Bloodline, choose Dawnguard (dg-hunter) or Volkihar vampires (dg-vampire). Later quests diverge until Kindred Judgment."
    },
    {
      "id": "dragonborn",
      "name": "Dragonborn",
      "group": "DLC",
      "summary": "Dragonborn DLC: confront Miraak on Solstheim and in Apocrypha."
    },
    {
      "id": "hearthfire",
      "name": "Hearthfire",
      "group": "DLC",
      "summary": "Hearthfire DLC: buy land, build a homestead, and adopt children."
    },
    {
      "id": "side_whiterun",
      "name": "Whiterun Hold",
      "group": "Side Quests",
      "summary": "Side quests centered on Whiterun and its hold."
    },
    {
      "id": "side_riften",
      "name": "The Rift",
      "group": "Side Quests",
      "summary": "Side quests in and around Riften."
    },
    {
      "id": "side_solitude",
      "name": "Haafingar",
      "group": "Side Quests",
      "summary": "Side quests in Solitude and Haafingar."
    },
    {
      "id": "side_windhelm",
      "name": "Eastmarch",
      "group": "Side Quests",
      "summary": "Side quests in Windhelm and Eastmarch."
    },
    {
      "id": "side_markarth",
      "name": "The Reach",
      "group": "Side Quests",
      "summary": "Side quests in Markarth and the Reach."
    },
    {
      "id": "side_morthal",
      "name": "Hjaalmarch",
      "group": "Side Quests",
      "summary": "Side quests in Morthal and Hjaalmarch."
    },
    {
      "id": "side_falkreath",
      "name": "Falkreath Hold",
      "group": "Side Quests",
      "summary": "Side quests in Falkreath Hold (non-Daedric)."
    },
    {
      "id": "side_dawnstar",
      "name": "The Pale",
      "group": "Side Quests",
      "summary": "Side quests in Dawnstar and the Pale."
    },
    {
      "id": "side_winterhold",
      "name": "Winterhold Hold",
      "group": "Side Quests",
      "summary": "Side quests in Winterhold Hold outside the College main line."
    },
    {
      "id": "side_solstheim",
      "name": "Solstheim",
      "group": "Side Quests",
      "summary": "Dragonborn DLC side quests on Solstheim.",
      "exclusiveNote": "Thirsk Mead Hall: Retaking Thirsk and Chief of Thirsk Hall are mutually exclusive (exclusiveGroup: thirsk-side)."
    },
    {
      "id": "misc_world",
      "name": "Dungeon & World Quests",
      "group": "Side Quests",
      "summary": "Notable dungeon and miscellaneous world quests across Skyrim."
    }
  ],
  "quests": [
    {
      "id": "unbound",
      "name": "Unbound",
      "categoryId": "main",
      "order": 1,
      "howToStart": "Automatic at character creation / Helgen intro.",
      "description": "Escape Helgen during the dragon attack and choose Imperial or Stormcloak escort.",
      "location": "Helgen",
      "alternatives": [
        "Follow Hadvar (Imperial)",
        "Follow Ralof (Stormcloak)"
      ],
      "note": "Tutorial; does not lock Civil War faction."
    },
    {
      "id": "before-the-storm",
      "name": "Before the Storm",
      "categoryId": "main",
      "order": 2,
      "howToStart": "Continues automatically after Unbound.",
      "description": "Deliver news of the dragon attack to Jarl Balgruuf in Whiterun.",
      "location": "Riverwood → Whiterun"
    },
    {
      "id": "bleak-falls-barrow",
      "name": "Bleak Falls Barrow",
      "categoryId": "main",
      "order": 3,
      "howToStart": "Jarl Balgruuf / Farengar after Before the Storm; also tied to The Golden Claw.",
      "description": "Retrieve the Dragonstone from Bleak Falls Barrow.",
      "location": "Bleak Falls Barrow"
    },
    {
      "id": "dragon-rising",
      "name": "Dragon Rising",
      "categoryId": "main",
      "order": 4,
      "howToStart": "Automatic after returning the Dragonstone.",
      "description": "Help the Whiterun guard defeat Mirmulnir at the Western Watchtower and absorb a dragon soul.",
      "location": "Western Watchtower"
    },
    {
      "id": "way-of-the-voice",
      "name": "The Way of the Voice",
      "categoryId": "main",
      "order": 5,
      "howToStart": "Jarl Balgruuf after Dragon Rising.",
      "description": "Travel to High Hrothgar and meet the Greybeards.",
      "location": "High Hrothgar"
    },
    {
      "id": "horn-of-jurgen-windcaller",
      "name": "The Horn of Jurgen Windcaller",
      "categoryId": "main",
      "order": 6,
      "howToStart": "Greybeards after The Way of the Voice.",
      "description": "Retrieve the Horn from Ustengrav; meet Delphine in Riverwood instead.",
      "location": "Ustengrav / Sleeping Giant Inn",
      "note": "Horn is missing; note leads to Delphine."
    },
    {
      "id": "blade-in-the-dark",
      "name": "A Blade in the Dark",
      "categoryId": "main",
      "order": 7,
      "howToStart": "Delphine after retrieving her note / Horn quest.",
      "description": "Help Delphine confirm you are Dragonborn by slaying Sahloknir at Kynesgrove.",
      "location": "Kynesgrove"
    },
    {
      "id": "diplomatic-immunity",
      "name": "Diplomatic Immunity",
      "categoryId": "main",
      "order": 8,
      "howToStart": "Delphine after A Blade in the Dark.",
      "description": "Infiltrate the Thalmor Embassy to uncover information about the dragons.",
      "location": "Thalmor Embassy",
      "canFail": "Leaving critical NPCs hostile or missing key dossier can soft-lock progress; follow Delphine's plan."
    },
    {
      "id": "cornered-rat",
      "name": "A Cornered Rat",
      "categoryId": "main",
      "order": 9,
      "howToStart": "Delphine after Diplomatic Immunity.",
      "description": "Find Esbern hiding in the Ratway beneath Riften.",
      "location": "The Ratway, Riften"
    },
    {
      "id": "alduins-wall",
      "name": "Alduin's Wall",
      "categoryId": "main",
      "order": 10,
      "howToStart": "Esbern / Delphine after A Cornered Rat.",
      "description": "Escort Esbern to Sky Haven Temple and learn Alduin's history from Alduin's Wall.",
      "location": "Sky Haven Temple"
    },
    {
      "id": "throat-of-the-world",
      "name": "The Throat of the World",
      "categoryId": "main",
      "order": 11,
      "howToStart": "Greybeards after Alduin's Wall (ask about Elder Scroll / Paarthurnax).",
      "description": "Meet Paarthurnax atop the Throat of the World and learn about Dragonrend.",
      "location": "Throat of the World"
    },
    {
      "id": "elder-knowledge",
      "name": "Elder Knowledge",
      "categoryId": "main",
      "order": 12,
      "howToStart": "Paarthurnath / Greybeards / Septimus Signus path.",
      "description": "Recover an Elder Scroll from Blackreach (or via Discerning the Transmundane).",
      "location": "Alftand / Blackreach / Tower of Mzark",
      "note": "Overlaps with Discerning the Transmundane."
    },
    {
      "id": "alduins-bane",
      "name": "Alduin's Bane",
      "categoryId": "main",
      "order": 13,
      "howToStart": "Automatic after obtaining the Elder Scroll.",
      "description": "Use the Elder Scroll at the Time-Wound, learn Dragonrend, and fight Alduin on the mountain.",
      "location": "Throat of the World"
    },
    {
      "id": "the-fallen",
      "name": "The Fallen",
      "categoryId": "main",
      "order": 14,
      "howToStart": "Continues after Alduin's Bane.",
      "description": "Trap a dragon in Dragonsreach to learn where Alduin fled.",
      "location": "Dragonsreach, Whiterun",
      "note": "If Whiterun is contested, Season Unending may be required first."
    },
    {
      "id": "season-unending",
      "name": "Season Unending",
      "categoryId": "main",
      "order": 15,
      "howToStart": "Triggered during The Fallen if Civil War is unfinished and Jarl will not allow the trap.",
      "description": "Negotiate a temporary truce at High Hrothgar so Dragonsreach can be used.",
      "location": "High Hrothgar",
      "alternatives": [
        "Concede holds to Empire",
        "Concede holds to Stormcloaks",
        "Trade cities via negotiation"
      ],
      "note": "Optional/conditional; skipped if Civil War already resolved or Whiterun already cooperative."
    },
    {
      "id": "paarthurnax-quest",
      "name": "Paarthurnax",
      "categoryId": "main",
      "order": 16,
      "howToStart": "Delphine at Sky Haven Temple after The Throat of the World / Alduin's Wall progress.",
      "description": "Optional Blades demand: kill Paarthurnax for his past crimes.",
      "location": "Throat of the World",
      "alternatives": [
        "Kill Paarthurnax (Blades remain allies)",
        "Refuse / spare Paarthurnax (Blades refuse further help)"
      ],
      "exclusiveGroup": "paarthurnax",
      "note": "ALT PATH: entirely optional; Greybeards vs Blades loyalty. Does not block Main Quest finale."
    },
    {
      "id": "world-eaters-eyrie",
      "name": "The World-Eater's Eyrie",
      "categoryId": "main",
      "order": 17,
      "howToStart": "After learning Alduin's location from the trapped dragon (Odahviing).",
      "description": "Fly to Skuldafn and fight through to Alduin's portal to Sovngarde.",
      "location": "Skuldafn"
    },
    {
      "id": "sovngarde",
      "name": "Sovngarde",
      "categoryId": "main",
      "order": 18,
      "howToStart": "Enter the portal at Skuldafn.",
      "description": "Traverse Sovngarde, clear the mist, and rally the ancient heroes.",
      "location": "Sovngarde"
    },
    {
      "id": "dragonslayer",
      "name": "Dragonslayer",
      "categoryId": "main",
      "order": 19,
      "howToStart": "Continues from Sovngarde.",
      "description": "Defeat Alduin in Sovngarde with the help of Gormlaith, Hakon, and Felldir.",
      "location": "Sovngarde",
      "note": "Main Quest finale."
    },
    {
      "id": "take-up-arms",
      "name": "Take Up Arms",
      "categoryId": "companions",
      "order": 1,
      "howToStart": "Speak to a Companion (often Kodlak or entrants) and ask to join; talk to Skjor/Vilkas.",
      "description": "Join the Companions by proving yourself under Vilkas and Farkas.",
      "location": "Jorrvaskr, Whiterun"
    },
    {
      "id": "proving-honor",
      "name": "Proving Honor",
      "categoryId": "companions",
      "order": 2,
      "howToStart": "Skjor after Take Up Arms and radiant jobs.",
      "description": "Retrieve a fragment of Wuuthrad from Dustman's Cairn with Farkas.",
      "location": "Dustman's Cairn"
    },
    {
      "id": "the-silver-hand",
      "name": "The Silver Hand",
      "categoryId": "companions",
      "order": 3,
      "howToStart": "Skjor after Proving Honor.",
      "description": "Witness the beast blood ritual and assault a Silver Hand hideout with Aela.",
      "location": "The Underforge / Gallows Rock",
      "alternatives": [
        "Accept beast blood",
        "Skip ritual for now (limits some content until later)"
      ]
    },
    {
      "id": "bloods-honor",
      "name": "Blood's Honor",
      "categoryId": "companions",
      "order": 4,
      "howToStart": "Kodlak after further radiants / The Silver Hand.",
      "description": "Retrieve Glenmoril Witch heads for Kodlak's cure research.",
      "location": "Glenmoril Coven"
    },
    {
      "id": "purity-of-revenge",
      "name": "Purity of Revenge",
      "categoryId": "companions",
      "order": 5,
      "howToStart": "Automatic after Kodlak's death following Blood's Honor.",
      "description": "Wipe out the Silver Hand leadership and recover Wuuthrad's fragments.",
      "location": "Driftshade Refuge"
    },
    {
      "id": "glory-of-the-dead",
      "name": "Glory of the Dead",
      "categoryId": "companions",
      "order": 6,
      "howToStart": "Continues after Purity of Revenge.",
      "description": "Enter Ysgramor's Tomb, decide Kodlak's curse, and become Harbinger.",
      "location": "Ysgramor's Tomb",
      "alternatives": [
        "Cure Kodlak's beast blood",
        "Related choices on your own lycanthropy later via Purity"
      ]
    },
    {
      "id": "animal-extermination",
      "name": "Animal Extermination",
      "categoryId": "companions",
      "order": 10,
      "howToStart": "Aela the Huntress (radiant).",
      "description": "Clear a beast den threatening locals.",
      "radiant": true
    },
    {
      "id": "hired-muscle",
      "name": "Hired Muscle",
      "categoryId": "companions",
      "order": 11,
      "howToStart": "Farkas (radiant).",
      "description": "Intimidate a target by brawling them into submission.",
      "radiant": true
    },
    {
      "id": "trouble-in-skyrim",
      "name": "Trouble in Skyrim",
      "categoryId": "companions",
      "order": 12,
      "howToStart": "Farkas (radiant).",
      "description": "Clear a dungeon of bandits or other hostiles for the Companions.",
      "radiant": true
    },
    {
      "id": "family-heirloom",
      "name": "Family Heirloom",
      "categoryId": "companions",
      "order": 13,
      "howToStart": "Skjor or Farkas (radiant).",
      "description": "Recover a stolen family heirloom from a dungeon.",
      "radiant": true
    },
    {
      "id": "escaped-criminal",
      "name": "Escaped Criminal",
      "categoryId": "companions",
      "order": 14,
      "howToStart": "Skjor (radiant).",
      "description": "Track down and kill an escaped criminal.",
      "radiant": true
    },
    {
      "id": "rescue-mission",
      "name": "Rescue Mission",
      "categoryId": "companions",
      "order": 15,
      "howToStart": "Vilkas (radiant).",
      "description": "Rescue a kidnapping victim from bandits.",
      "radiant": true
    },
    {
      "id": "striking-the-heart",
      "name": "Striking the Heart",
      "categoryId": "companions",
      "order": 16,
      "howToStart": "Aela (radiant; after The Silver Hand).",
      "description": "Assassinate a Silver Hand leader.",
      "radiant": true
    },
    {
      "id": "stealing-plans",
      "name": "Stealing Plans",
      "categoryId": "companions",
      "order": 17,
      "howToStart": "Aela (radiant; after The Silver Hand).",
      "description": "Steal Silver Hand plans from a camp.",
      "radiant": true
    },
    {
      "id": "retrieval",
      "name": "Retrieval",
      "categoryId": "companions",
      "order": 18,
      "howToStart": "Aela (radiant; after The Silver Hand).",
      "description": "Recover a fragment of Wuuthrad from Silver Hand.",
      "radiant": true
    },
    {
      "id": "totems-of-hircine",
      "name": "Totems of Hircine",
      "categoryId": "companions",
      "order": 19,
      "howToStart": "Aela (radiant; after Glory of the Dead, if still a werewolf).",
      "description": "Recover Totems of Hircine for the Underforge.",
      "radiant": true
    },
    {
      "id": "purity",
      "name": "Purity",
      "categoryId": "companions",
      "order": 20,
      "howToStart": "Vilkas or Farkas after Glory of the Dead (if they still have beast blood).",
      "description": "Help a Circle member cure their lycanthropy using a Glenmoril head.",
      "alternatives": [
        "Cure them",
        "Decline"
      ],
      "note": "Repeatable for eligible Circle members; uses Glenmoril Witch heads.",
      "radiant": true
    },
    {
      "id": "first-lessons",
      "name": "First Lessons",
      "categoryId": "college",
      "order": 1,
      "howToStart": "Speak to Faralda at the College bridge and pass her test (or persuade/Shout).",
      "description": "Gain admission to the College and meet the Arch-Mage and faculty.",
      "location": "College of Winterhold"
    },
    {
      "id": "under-saarthal",
      "name": "Under Saarthal",
      "categoryId": "college",
      "order": 2,
      "howToStart": "Tolfdir after First Lessons.",
      "description": "Explore Saarthal on a student dig and discover the Eye of Magnus.",
      "location": "Saarthal"
    },
    {
      "id": "hitting-the-books",
      "name": "Hitting the Books",
      "categoryId": "college",
      "order": 3,
      "howToStart": "Arch-Mage Savos Aren after Under Saarthal.",
      "description": "Recover stolen books about the Eye from Fellglow Keep.",
      "location": "Fellglow Keep",
      "alternatives": [
        "Free the Orthorn mage",
        "Leave Orthorn / sacrifice options in dialogue"
      ]
    },
    {
      "id": "good-intentions",
      "name": "Good Intentions",
      "categoryId": "college",
      "order": 4,
      "howToStart": "Savos Aren after Hitting the Books.",
      "description": "Consult the Augur of Dunlain in the Midden about the Eye.",
      "location": "The Midden"
    },
    {
      "id": "revealing-the-unseen",
      "name": "Revealing the Unseen",
      "categoryId": "college",
      "order": 5,
      "howToStart": "Mirabelle Ervine after Good Intentions.",
      "description": "Find the Synod's staff research at Mzulft and uncover the Eye's nature.",
      "location": "Mzulft / Labyrinthian marker"
    },
    {
      "id": "containment",
      "name": "Containment",
      "categoryId": "college",
      "order": 6,
      "howToStart": "Automatic after Ancano activates the Eye.",
      "description": "Secure Winterhold after the Eye's surge and deal with the aftermath.",
      "location": "College of Winterhold / Winterhold"
    },
    {
      "id": "staff-of-magnus",
      "name": "The Staff of Magnus",
      "categoryId": "college",
      "order": 7,
      "howToStart": "Continues after Containment.",
      "description": "Retrieve the Staff of Magnus from Labyrinthian.",
      "location": "Labyrinthian"
    },
    {
      "id": "eye-of-magnus",
      "name": "The Eye of Magnus",
      "categoryId": "college",
      "order": 8,
      "howToStart": "Return with the Staff of Magnus.",
      "description": "Defeat Ancano, contain the Eye, and become Arch-Mage.",
      "location": "College of Winterhold"
    },
    {
      "id": "arniels-endeavor",
      "name": "Arniel's Endeavor",
      "categoryId": "college",
      "order": 10,
      "howToStart": "Arniel Gane at the College (multi-stage).",
      "description": "Assist Arniel's Dwemer research across several fetch and experiment stages.",
      "location": "College of Winterhold / various Dwemer ruins",
      "note": "Multi-part; culminates in a unique summon."
    },
    {
      "id": "brelynas-practice",
      "name": "Brelyna's Practice",
      "categoryId": "college",
      "order": 11,
      "howToStart": "Brelyna Maryon after Under Saarthal.",
      "description": "Let Brelyna practice alteration spells on you.",
      "location": "College of Winterhold"
    },
    {
      "id": "jzargos-experiment",
      "name": "J'zargo's Experiment",
      "categoryId": "college",
      "order": 12,
      "howToStart": "J'zargo after Under Saarthal.",
      "description": "Test J'zargo's flame cloaks on undead—carefully.",
      "location": "Various undead dungeons",
      "canFail": "The scrolls can harm you; not a quest failure but easy to die."
    },
    {
      "id": "onmunds-request",
      "name": "Onmund's Request",
      "categoryId": "college",
      "order": 13,
      "howToStart": "Onmund after Under Saarthal.",
      "description": "Help Onmund reclaim a family amulet from Enthir.",
      "location": "College of Winterhold"
    },
    {
      "id": "out-of-balance",
      "name": "Out of Balance",
      "categoryId": "college",
      "order": 14,
      "howToStart": "Tolfdir (radiant) after joining.",
      "description": "Cleanse magical disturbances at various locations using Purging Fire.",
      "radiant": true
    },
    {
      "id": "shalidors-insights",
      "name": "Shalidor's Insights",
      "categoryId": "college",
      "order": 15,
      "howToStart": "Urag gro-Shub (radiant).",
      "description": "Find lost Shalidor writings for the Arcanaeum in exchange for translation perks.",
      "radiant": true
    },
    {
      "id": "alteration-ritual",
      "name": "Alteration Ritual Spell",
      "categoryId": "college",
      "order": 20,
      "howToStart": "Tolfdir at Alteration 90+.",
      "description": "Fetch heart scales from a dragon and learn Mass Paralysis.",
      "location": "College of Winterhold"
    },
    {
      "id": "conjuration-ritual",
      "name": "Conjuration Ritual Spell",
      "categoryId": "college",
      "order": 21,
      "howToStart": "Phinis Gestor at Conjuration 90+.",
      "description": "Summon and defeat an unbound dremora to obtain Sigil Stone materials; learn Flame Thrall line.",
      "location": "College of Winterhold"
    },
    {
      "id": "destruction-ritual",
      "name": "Destruction Ritual Spell",
      "categoryId": "college",
      "order": 22,
      "howToStart": "Faralda at Destruction 90+.",
      "description": "Complete the elemental tome puzzle at windy peaks; learn Lightning Storm.",
      "location": "Powerful peak locations across Skyrim"
    },
    {
      "id": "illusion-ritual",
      "name": "Illusion Ritual Spell",
      "categoryId": "college",
      "order": 23,
      "howToStart": "Drevis Neloren at Illusion 90+.",
      "description": "Find four master illusion texts with the Vision of the Tenth Eye; learn Harmony.",
      "location": "College of Winterhold"
    },
    {
      "id": "restoration-ritual",
      "name": "Restoration Ritual Spell",
      "categoryId": "college",
      "order": 24,
      "howToStart": "Colette Marence at Restoration 90+; Augur of Dunlain trial.",
      "description": "Survive the Augur's ghostly gauntlet; learn Guardian Circle.",
      "location": "The Midden"
    },
    {
      "id": "chance-arrangement",
      "name": "A Chance Arrangement",
      "categoryId": "thieves_guild",
      "order": 1,
      "howToStart": "Brynjolf in Riften marketplace (or Ratway if missed).",
      "description": "Plant evidence and frame Brand-Shei to prove your skill to Brynjolf.",
      "location": "Riften",
      "canFail": "Failing the distraction still continues, but getting caught has consequences."
    },
    {
      "id": "taking-care-of-business",
      "name": "Taking Care of Business",
      "categoryId": "thieves_guild",
      "order": 2,
      "howToStart": "Brynjolf after A Chance Arrangement.",
      "description": "Collect debts from three Riften business owners for the Guild.",
      "location": "Riften"
    },
    {
      "id": "loud-and-clear",
      "name": "Loud and Clear",
      "categoryId": "thieves_guild",
      "order": 3,
      "howToStart": "Brynjolf after Taking Care of Business.",
      "description": "Rob Goldenglow Estate and burn its beehives per Maven's interests.",
      "location": "Goldenglow Estate",
      "alternatives": [
        "Burn enough beehives as instructed",
        "Extra hostilities if detected"
      ]
    },
    {
      "id": "dampened-spirits",
      "name": "Dampened Spirits",
      "categoryId": "thieves_guild",
      "order": 4,
      "howToStart": "Maven Black-Briar / Brynjolf after Loud and Clear.",
      "description": "Sabotage Honningbrew Meadery for Maven.",
      "location": "Honningbrew Meadery / Whiterun"
    },
    {
      "id": "scoundrels-folly",
      "name": "Scoundrel's Folly",
      "categoryId": "thieves_guild",
      "order": 5,
      "howToStart": "Mercer Frey after Dampened Spirits.",
      "description": "Track Gulum-Ei and uncover leads on Karliah.",
      "location": "Solitude / East Empire Company / Broken Oar Grotto"
    },
    {
      "id": "speaking-with-silence",
      "name": "Speaking With Silence",
      "categoryId": "thieves_guild",
      "order": 6,
      "howToStart": "Mercer Frey after Scoundrel's Folly.",
      "description": "Confront Karliah at Snow Veil Sanctum—and learn Mercer betrayed the Guild.",
      "location": "Snow Veil Sanctum"
    },
    {
      "id": "hard-answers",
      "name": "Hard Answers",
      "categoryId": "thieves_guild",
      "order": 7,
      "howToStart": "Karliah after Speaking With Silence.",
      "description": "Translate Gallus's journal via Calcelmo in Markarth.",
      "location": "Understone Keep / Dwemer Museum / Wizard's Tower"
    },
    {
      "id": "the-pursuit",
      "name": "The Pursuit",
      "categoryId": "thieves_guild",
      "order": 8,
      "howToStart": "Karliah / Brynjolf after Hard Answers.",
      "description": "Expose Mercer, infiltrate the Guild vault, and chase leads to irreversible theft.",
      "location": "Riften / Black-Briar Manor / Guild cistern"
    },
    {
      "id": "trinity-restored",
      "name": "Trinity Restored",
      "categoryId": "thieves_guild",
      "order": 9,
      "howToStart": "Karliah after The Pursuit.",
      "description": "Reforge the Nightingale triad at the Twilight Sepulcher pathway.",
      "location": "Nightingale Hall"
    },
    {
      "id": "blindsighted",
      "name": "Blindsighted",
      "categoryId": "thieves_guild",
      "order": 10,
      "howToStart": "Continues after Trinity Restored.",
      "description": "Hunt Mercer Frey in Irkngthand and reclaim the Skeleton Key.",
      "location": "Irkngthand / Blackreach approach"
    },
    {
      "id": "darkness-returns",
      "name": "Darkness Returns",
      "categoryId": "thieves_guild",
      "order": 11,
      "howToStart": "After recovering the Skeleton Key.",
      "description": "Return the Skeleton Key to Nocturnal and walk the Pilgrim's Path.",
      "location": "Twilight Sepulcher",
      "alternatives": [
        "Nightingale Agent",
        "Nightingale Agent (different boon shrines later)"
      ]
    },
    {
      "id": "under-new-management",
      "name": "Under New Management",
      "categoryId": "thieves_guild",
      "order": 12,
      "howToStart": "After Darkness Returns and completing the four city influence quests.",
      "description": "Become Guild Master of the Thieves Guild.",
      "location": "Riften Ragged Flagon cistern",
      "note": "Requires Whiterun, Markarth, Windhelm, and Solitude special quests."
    },
    {
      "id": "imitation-amnesty",
      "name": "Imitation Amnesty",
      "categoryId": "thieves_guild",
      "order": 20,
      "howToStart": "Delvin Mallory after 5 small jobs in Whiterun Hold (not Riften).",
      "description": "Whiterun city influence quest: forge evidence to free a prisoner for the Guild.",
      "location": "Whiterun",
      "note": "City special — unlocks Whiterun merchant / trophy progress."
    },
    {
      "id": "silver-lining",
      "name": "Silver Lining",
      "categoryId": "thieves_guild",
      "order": 21,
      "howToStart": "Delvin after 5 small jobs in the Reach.",
      "description": "Markarth city influence quest: recover Endon the silversmith's stolen silver mold.",
      "location": "Markarth / Pinewatch",
      "note": "City special."
    },
    {
      "id": "summerset-shadows",
      "name": "Summerset Shadows",
      "categoryId": "thieves_guild",
      "order": 22,
      "howToStart": "Delvin after 5 small jobs in Eastmarch.",
      "description": "Windhelm city influence quest: destroy the Summerset Shadows rival guild.",
      "location": "Windhelm / Uttering Hills Cave",
      "note": "City special."
    },
    {
      "id": "dainty-sload",
      "name": "The Dainty Sload",
      "categoryId": "thieves_guild",
      "order": 23,
      "howToStart": "Delvin after 5 small jobs in Haafingar.",
      "description": "Solitude city influence quest: plant balmora blue on the Dainty Sload.",
      "location": "Solitude / Dainty Sload",
      "note": "City special."
    },
    {
      "id": "numbers-job",
      "name": "The Numbers Job",
      "categoryId": "thieves_guild",
      "order": 30,
      "howToStart": "Delvin Mallory (radiant).",
      "description": "Alter a business ledger in a hold city.",
      "radiant": true
    },
    {
      "id": "fishing-job",
      "name": "The Fishing Job",
      "categoryId": "thieves_guild",
      "order": 31,
      "howToStart": "Vex (radiant).",
      "description": "Pickpocket a specific item from a target.",
      "radiant": true
    },
    {
      "id": "bedlam-job",
      "name": "The Bedlam Job",
      "categoryId": "thieves_guild",
      "order": 32,
      "howToStart": "Delvin Mallory (radiant).",
      "description": "Steal a total value of goods from a hold's city.",
      "radiant": true
    },
    {
      "id": "shill-job",
      "name": "The Shill Job",
      "categoryId": "thieves_guild",
      "order": 33,
      "howToStart": "Vex (radiant).",
      "description": "Plant stolen goods in a target's home.",
      "radiant": true
    },
    {
      "id": "sweep-job",
      "name": "The Sweep Job",
      "categoryId": "thieves_guild",
      "order": 34,
      "howToStart": "Vex (radiant).",
      "description": "Steal three specific valuables from a house.",
      "radiant": true
    },
    {
      "id": "heist-job",
      "name": "The Heist Job",
      "categoryId": "thieves_guild",
      "order": 35,
      "howToStart": "Vex (radiant).",
      "description": "Steal a valuable item from a shop strongbox/safe.",
      "radiant": true
    },
    {
      "id": "delayed-burial",
      "name": "Delayed Burial",
      "categoryId": "dark_brotherhood",
      "order": 1,
      "howToStart": "Cicero on the road near Loreius Farm (White River / Pale area).",
      "description": "Help—or hinder—Cicero with his wagon before he reaches the Dawnstar sanctuary road.",
      "location": "Loreius Farm",
      "alternatives": [
        "Help Cicero (convince Loreius)",
        "Report Cicero to the guard / side against him"
      ],
      "note": "Optional lead-in; can complete before or around Innocence Lost."
    },
    {
      "id": "innocence-lost",
      "name": "Innocence Lost",
      "categoryId": "dark_brotherhood",
      "order": 2,
      "howToStart": "Hear children rumor in any major city, then speak to Aventus Aretino in Windhelm.",
      "description": "Perform the Black Sacrament's requested killing of Grelod the Kind in Riften.",
      "location": "Aretino Residence, Windhelm / Honorhall Orphanage, Riften"
    },
    {
      "id": "with-friends-like-these",
      "name": "With Friends Like These…",
      "categoryId": "dark_brotherhood",
      "order": 3,
      "howToStart": "Sleep in a bed after Innocence Lost; Astrid abducts you to an abandoned shack.",
      "description": "Kill one of the hostages per Astrid's test to earn an invitation to the Brotherhood.",
      "location": "Abandoned Shack → Dark Brotherhood Sanctuary",
      "alternatives": [
        "Kill a hostage and join",
        "Kill Astrid instead → starts Destroy the Dark Brotherhood!"
      ],
      "exclusiveGroup": "db-start",
      "note": "ALT PATH: killing Astrid here begins the destroy path and locks the join questline."
    },
    {
      "id": "db-sanctuary",
      "name": "Sanctuary",
      "categoryId": "dark_brotherhood",
      "order": 4,
      "howToStart": "Astrid after completing With Friends Like These… (join path).",
      "description": "Meet the family at the Falkreath sanctuary and receive your first contracts from Nazir.",
      "location": "Dark Brotherhood Sanctuary",
      "exclusiveGroup": "db-join"
    },
    {
      "id": "db-nazir-contracts",
      "name": "Nazir's Contract Board",
      "categoryId": "dark_brotherhood",
      "order": 5,
      "howToStart": "Nazir at the sanctuary after Sanctuary (and later between story quests).",
      "description": "Complete side assassination contracts assigned by Nazir (Narfi, Ennodius, Beitild, and later targets).",
      "location": "Various",
      "exclusiveGroup": "db-join",
      "note": "Treat as radiant contract set; required early targets gate Mourning Never Comes.",
      "radiant": true
    },
    {
      "id": "mourning-never-comes",
      "name": "Mourning Never Comes",
      "categoryId": "dark_brotherhood",
      "order": 6,
      "howToStart": "Astrid after first Nazir contracts.",
      "description": "Assassinate Muiri's targets in Markarth / Lost Knife Hideout area per her Sacrament.",
      "location": "Markarth / Broken Tower Redoubt",
      "exclusiveGroup": "db-join"
    },
    {
      "id": "whispers-in-the-dark",
      "name": "Whispers in the Dark",
      "categoryId": "dark_brotherhood",
      "order": 7,
      "howToStart": "Astrid after Mourning Never Comes.",
      "description": "Investigate the Night Mother's coffin and Cicero; become Listener.",
      "location": "Dark Brotherhood Sanctuary",
      "exclusiveGroup": "db-join"
    },
    {
      "id": "silence-has-been-broken",
      "name": "The Silence Has Been Broken",
      "categoryId": "dark_brotherhood",
      "order": 8,
      "howToStart": "Night Mother / Astrid after Whispers in the Dark (and more Nazir contracts).",
      "description": "Meet Amaund Motierre in Volunruud and accept the Emperor contract chain.",
      "location": "Volunruud / Dark Brotherhood Sanctuary",
      "exclusiveGroup": "db-join"
    },
    {
      "id": "bound-until-death",
      "name": "Bound Until Death",
      "categoryId": "dark_brotherhood",
      "order": 9,
      "howToStart": "Astrid after The Silence Has Been Broken.",
      "description": "Assassinate Vittoria Vici at her wedding in Solitude.",
      "location": "Solitude",
      "exclusiveGroup": "db-join"
    },
    {
      "id": "breaching-security",
      "name": "Breaching Security",
      "categoryId": "dark_brotherhood",
      "order": 10,
      "howToStart": "Gabriella after Bound Until Death.",
      "description": "Kill Gaius Maro and plant incriminating evidence on his body.",
      "location": "Dragon Bridge / travel route",
      "alternatives": [
        "Bonus: kill while he is not in Dragon Bridge for extra reward"
      ],
      "exclusiveGroup": "db-join"
    },
    {
      "id": "cure-for-madness",
      "name": "The Cure for Madness",
      "categoryId": "dark_brotherhood",
      "order": 11,
      "howToStart": "Astrid after Breaching Security.",
      "description": "Track Cicero to the Dawnstar Sanctuary and decide his fate.",
      "location": "Dawnstar Sanctuary",
      "alternatives": [
        "Kill Cicero",
        "Spare Cicero"
      ],
      "exclusiveGroup": "db-join"
    },
    {
      "id": "recipe-for-disaster",
      "name": "Recipe for Disaster",
      "categoryId": "dark_brotherhood",
      "order": 12,
      "howToStart": "Astrid / Gourmet subplot after The Cure for Madness.",
      "description": "Assassinate the Gourmet and assume his identity for the Emperor's feast.",
      "location": "Nightgate Inn",
      "exclusiveGroup": "db-join"
    },
    {
      "id": "to-kill-an-empire",
      "name": "To Kill an Empire",
      "categoryId": "dark_brotherhood",
      "order": 13,
      "howToStart": "Astrid after Recipe for Disaster.",
      "description": "Infiltrate the Emperor's dinner at Castle Dour as the Gourmet.",
      "location": "Castle Dour, Solitude",
      "exclusiveGroup": "db-join",
      "note": "The 'Emperor' at the feast is a body double—story continues."
    },
    {
      "id": "death-incarnate",
      "name": "Death Incarnate",
      "categoryId": "dark_brotherhood",
      "order": 14,
      "howToStart": "Automatic after To Kill an Empire betrayal.",
      "description": "Escape the Penitus Oculatus raid and burn the Falkreath sanctuary.",
      "location": "Dark Brotherhood Sanctuary",
      "exclusiveGroup": "db-join"
    },
    {
      "id": "hail-sithis",
      "name": "Hail Sithis!",
      "categoryId": "dark_brotherhood",
      "order": 15,
      "howToStart": "Night Mother after Death Incarnate.",
      "description": "Confront Motierre, board the Katariah, and assassinate Emperor Titus Mede II.",
      "location": "The Katariah / Solitude docks",
      "alternatives": [
        "Spare or kill Motierre afterward",
        "Optional: kill Commander Maro"
      ],
      "exclusiveGroup": "db-join"
    },
    {
      "id": "where-you-hang",
      "name": "Where You Hang Your Enemy's Head…",
      "categoryId": "dark_brotherhood",
      "order": 16,
      "howToStart": "Night Mother after Hail Sithis!.",
      "description": "Refurnish and reopen the Dawnstar Sanctuary as the new home.",
      "location": "Dawnstar Sanctuary",
      "exclusiveGroup": "db-join"
    },
    {
      "id": "dark-brotherhood-forever",
      "name": "The Dark Brotherhood Forever",
      "categoryId": "dark_brotherhood",
      "order": 17,
      "howToStart": "Night Mother after Where You Hang Your Enemy's Head….",
      "description": "Repeatable radiant contracts from the Night Mother's new petitioners.",
      "exclusiveGroup": "db-join",
      "radiant": true
    },
    {
      "id": "destroy-dark-brotherhood",
      "name": "Destroy the Dark Brotherhood!",
      "categoryId": "dark_brotherhood",
      "order": 18,
      "howToStart": "Kill Astrid in the Abandoned Shack during With Friends Like These…, then report to any guard.",
      "description": "Work with Commander Maro to assault and wipe out the Falkreath sanctuary.",
      "location": "Abandoned Shack → Dark Brotherhood Sanctuary",
      "exclusiveGroup": "db-start",
      "note": "ALT PATH: mutually exclusive with the join questline. Killing Astrid is the trigger."
    },
    {
      "id": "joining-the-legion",
      "name": "Joining the Legion",
      "categoryId": "imperial",
      "order": 1,
      "howToStart": "Speak to Legate Rikke / General Tullius in Castle Dour, Solitude (after Unbound).",
      "description": "Swear loyalty to the Empire and clear a fort to enlist.",
      "location": "Castle Dour, Solitude",
      "exclusiveGroup": "civil-war",
      "note": "Locks out Joining the Stormcloaks."
    },
    {
      "id": "jagged-crown-imp",
      "name": "The Jagged Crown (Imperial)",
      "categoryId": "imperial",
      "order": 2,
      "howToStart": "Legate Rikke after Joining the Legion.",
      "description": "Retrieve the Jagged Crown from Korvanjund for the Empire.",
      "location": "Korvanjund",
      "alternatives": [
        "Optionally give crown to Stormcloaks instead (switches sides)"
      ],
      "exclusiveGroup": "civil-war-imp"
    },
    {
      "id": "message-to-whiterun-imp",
      "name": "Message to Whiterun (Imperial)",
      "categoryId": "imperial",
      "order": 3,
      "howToStart": "Tullius after The Jagged Crown.",
      "description": "Deliver the Legion's demand to Jarl Balgruuf and secure Whiterun's allegiance.",
      "location": "Whiterun / Solitude",
      "exclusiveGroup": "civil-war-imp"
    },
    {
      "id": "battle-for-whiterun-imp",
      "name": "Battle for Whiterun (Imperial)",
      "categoryId": "imperial",
      "order": 4,
      "howToStart": "Automatic when Stormcloaks assault Whiterun (Imperial side).",
      "description": "Defend Whiterun from Ulfric's assault.",
      "location": "Whiterun",
      "exclusiveGroup": "civil-war-imp"
    },
    {
      "id": "reunification-of-skyrim",
      "name": "Reunification of Skyrim",
      "categoryId": "imperial",
      "order": 5,
      "howToStart": "General Tullius after Battle for Whiterun.",
      "description": "Umbrella campaign quest to reclaim Stormcloak holds for the Empire.",
      "location": "Skyrim",
      "exclusiveGroup": "civil-war-imp",
      "note": "Parent quest for the following Imperial fort/city battles."
    },
    {
      "id": "false-front-imp",
      "name": "A False Front (Imperial)",
      "categoryId": "imperial",
      "order": 6,
      "howToStart": "Legate Rikke during Reunification of Skyrim.",
      "description": "Intercept Stormcloak couriers and forge orders.",
      "exclusiveGroup": "civil-war-imp"
    },
    {
      "id": "battle-fort-dunstad",
      "name": "The Battle for Fort Dunstad",
      "categoryId": "imperial",
      "order": 7,
      "howToStart": "Legate Rikke during Reunification of Skyrim.",
      "description": "Seize Fort Dunstad in the Pale.",
      "location": "Fort Dunstad",
      "exclusiveGroup": "civil-war-imp"
    },
    {
      "id": "compelling-tribute-imp",
      "name": "Compelling Tribute (Imperial)",
      "categoryId": "imperial",
      "order": 8,
      "howToStart": "Legate Rikke during Reunification of Skyrim.",
      "description": "Blackmail/steal a Stormcloak shipment to weaken the Reach resistance.",
      "location": "Markarth area",
      "exclusiveGroup": "civil-war-imp"
    },
    {
      "id": "battle-fort-greenwall",
      "name": "The Battle for Fort Greenwall",
      "categoryId": "imperial",
      "order": 9,
      "howToStart": "Legate Rikke during Reunification of Skyrim.",
      "description": "Capture Fort Greenwall in the Rift.",
      "location": "Fort Greenwall",
      "exclusiveGroup": "civil-war-imp"
    },
    {
      "id": "rescue-fort-kastav",
      "name": "Rescue from Fort Kastav",
      "categoryId": "imperial",
      "order": 10,
      "howToStart": "Legate Rikke during Reunification of Skyrim.",
      "description": "Rescue Imperial POWs from Fort Kastav.",
      "location": "Fort Kastav",
      "exclusiveGroup": "civil-war-imp"
    },
    {
      "id": "battle-fort-amol",
      "name": "The Battle for Fort Amol",
      "categoryId": "imperial",
      "order": 11,
      "howToStart": "Legate Rikke during Reunification of Skyrim.",
      "description": "Take Fort Amol in Eastmarch as a prelude to Windhelm.",
      "location": "Fort Amol",
      "exclusiveGroup": "civil-war-imp"
    },
    {
      "id": "battle-for-windhelm",
      "name": "Battle for Windhelm",
      "categoryId": "imperial",
      "order": 12,
      "howToStart": "General Tullius at the end of Reunification of Skyrim.",
      "description": "Assault Windhelm and defeat Ulfric Stormcloak.",
      "location": "Windhelm",
      "exclusiveGroup": "civil-war-imp",
      "note": "Imperial campaign finale."
    },
    {
      "id": "joining-the-stormcloaks",
      "name": "Joining the Stormcloaks",
      "categoryId": "stormcloaks",
      "order": 1,
      "howToStart": "Speak to Ulfric Stormcloak / Galmar in the Palace of the Kings, Windhelm.",
      "description": "Prove yourself to Galmar and swear to the Stormcloak cause.",
      "location": "Windhelm",
      "exclusiveGroup": "civil-war",
      "note": "Locks out Joining the Legion."
    },
    {
      "id": "jagged-crown-sc",
      "name": "The Jagged Crown (Stormcloak)",
      "categoryId": "stormcloaks",
      "order": 2,
      "howToStart": "Galmar Stone-Fist after Joining the Stormcloaks.",
      "description": "Retrieve the Jagged Crown from Korvanjund for Ulfric.",
      "location": "Korvanjund",
      "alternatives": [
        "Optionally give crown to the Legion instead (switches sides)"
      ],
      "exclusiveGroup": "civil-war-sc"
    },
    {
      "id": "message-to-whiterun-sc",
      "name": "Message to Whiterun (Stormcloak)",
      "categoryId": "stormcloaks",
      "order": 3,
      "howToStart": "Ulfric after The Jagged Crown.",
      "description": "Deliver Ulfric's axe as an ultimatum to Jarl Balgruuf.",
      "location": "Whiterun / Windhelm",
      "exclusiveGroup": "civil-war-sc"
    },
    {
      "id": "battle-for-whiterun-sc",
      "name": "Battle for Whiterun (Stormcloak)",
      "categoryId": "stormcloaks",
      "order": 4,
      "howToStart": "Galmar when the assault begins.",
      "description": "Attack Whiterun and force Balgruuf's surrender.",
      "location": "Whiterun",
      "exclusiveGroup": "civil-war-sc"
    },
    {
      "id": "liberation-of-skyrim",
      "name": "Liberation of Skyrim",
      "categoryId": "stormcloaks",
      "order": 5,
      "howToStart": "Ulfric after Battle for Whiterun.",
      "description": "Umbrella campaign quest to liberate Imperial holds.",
      "location": "Skyrim",
      "exclusiveGroup": "civil-war-sc",
      "note": "Parent quest for the following Stormcloak fort/city battles."
    },
    {
      "id": "rescue-fort-neugrad",
      "name": "Rescue from Fort Neugrad",
      "categoryId": "stormcloaks",
      "order": 6,
      "howToStart": "Galmar during Liberation of Skyrim.",
      "description": "Rescue Stormcloak prisoners and take Fort Neugrad.",
      "location": "Fort Neugrad",
      "exclusiveGroup": "civil-war-sc"
    },
    {
      "id": "compelling-tribute-sc",
      "name": "Compelling Tribute (Stormcloak)",
      "categoryId": "stormcloaks",
      "order": 7,
      "howToStart": "Galmar during Liberation of Skyrim.",
      "description": "Intercept an Imperial tribute caravan tied to Markarth politics.",
      "exclusiveGroup": "civil-war-sc"
    },
    {
      "id": "battle-fort-sungard",
      "name": "The Battle for Fort Sungard",
      "categoryId": "stormcloaks",
      "order": 8,
      "howToStart": "Galmar during Liberation of Skyrim.",
      "description": "Capture Fort Sungard in the Reach.",
      "location": "Fort Sungard",
      "exclusiveGroup": "civil-war-sc"
    },
    {
      "id": "false-front-sc",
      "name": "A False Front (Stormcloak)",
      "categoryId": "stormcloaks",
      "order": 9,
      "howToStart": "Galmar during Liberation of Skyrim.",
      "description": "Kill an Imperial courier and forge military documents.",
      "exclusiveGroup": "civil-war-sc"
    },
    {
      "id": "battle-fort-snowhawk",
      "name": "The Battle for Fort Snowhawk",
      "categoryId": "stormcloaks",
      "order": 10,
      "howToStart": "Galmar during Liberation of Skyrim.",
      "description": "Seize Fort Snowhawk in Hjaalmarch.",
      "location": "Fort Snowhawk",
      "exclusiveGroup": "civil-war-sc"
    },
    {
      "id": "battle-fort-hraggstad",
      "name": "The Battle for Fort Hraggstad",
      "categoryId": "stormcloaks",
      "order": 11,
      "howToStart": "Galmar during Liberation of Skyrim.",
      "description": "Take Fort Hraggstad near Solitude.",
      "location": "Fort Hraggstad",
      "exclusiveGroup": "civil-war-sc"
    },
    {
      "id": "battle-for-solitude",
      "name": "Battle for Solitude",
      "categoryId": "stormcloaks",
      "order": 12,
      "howToStart": "Ulfric / Galmar at the end of Liberation of Skyrim.",
      "description": "Assault Castle Dour and kill General Tullius.",
      "location": "Solitude",
      "exclusiveGroup": "civil-war-sc",
      "note": "Stormcloak campaign finale."
    },
    {
      "id": "the-black-star",
      "name": "The Black Star",
      "categoryId": "daedric",
      "order": 1,
      "howToStart": "Speak to Arayna / find Azura's Shrine southeast of Winterhold; talk to Aranea Ienith.",
      "description": "Retrieve Azura's Star from the necromancer Illanil / Malyn Varen's soul experiment.",
      "location": "Shrine of Azura / Azura's Star interior",
      "alternatives": [
        "Purify as Azura's Star (white souls)",
        "Transform into the Black Star (black souls) with Nelacar"
      ],
      "note": "ALT PATH: Azura's Star vs Black Star ending."
    },
    {
      "id": "boethiahs-calling",
      "name": "Boethiah's Calling",
      "categoryId": "daedric",
      "order": 2,
      "howToStart": "Find Boethiah's Proving (level 30+) or the Sacellum of Boethiah.",
      "description": "Sacrifice a follower, survive Boethiah's tournament, and kill the previous champion.",
      "location": "Sacellum of Boethiah / Knifepoint Ridge",
      "canFail": "Requires a sacrificeable follower; killing the wrong NPCs can complicate setup."
    },
    {
      "id": "daedras-best-friend",
      "name": "A Daedra's Best Friend",
      "categoryId": "daedric",
      "order": 3,
      "howToStart": "Speak to Lod in Falkreath about a lost dog, then follow Barbas.",
      "description": "Help Barbas reunite with Clavicus Vile at Haemar's Shame.",
      "location": "Falkreath / Haemar's Shame",
      "alternatives": [
        "Keep the Rueful Axe and kill Barbas",
        "Return the axe and spare Barbas for the Masque of Clavicus Vile"
      ],
      "note": "Choice at the end determines artifact."
    },
    {
      "id": "discerning-the-transmundane",
      "name": "Discerning the Transmundane",
      "categoryId": "daedric",
      "order": 4,
      "howToStart": "Septimus Signus at his outpost north of Winterhold (also via Elder Knowledge).",
      "description": "Gather blood samples and open a Dwemer lockbox for Septimus—and Hermaeus Mora.",
      "location": "Septimus Signus's Outpost / Blackreach",
      "alternatives": [
        "Oghma Infinium still obtained after Mora's reveal"
      ],
      "note": "Hermaeus Mora quest; overlaps Main Quest Elder Knowledge."
    },
    {
      "id": "ill-met-by-moonlight",
      "name": "Ill Met By Moonlight",
      "categoryId": "daedric",
      "order": 5,
      "howToStart": "Speak to Mathies / Sinding in Falkreath jail about the murdered girl.",
      "description": "Hunt—or aid—the werewolf Sinding under Hircine's eye in Bloated Man's Grotto.",
      "location": "Falkreath / Bloated Man's Grotto",
      "alternatives": [
        "Kill Sinding (Savior's Hide)",
        "Spare Sinding / kill the hunters (Ring of Hircine)"
      ],
      "note": "ALT PATH: Savior's Hide vs Ring of Hircine (or both with certain tactics/bugs noted on UESP)."
    },
    {
      "id": "the-cursed-tribe",
      "name": "The Cursed Tribe",
      "categoryId": "daedric",
      "order": 6,
      "howToStart": "Discover Largashbur in the Rift and help the orcs under siege.",
      "description": "Lift Malacath's curse by retrieving Shagrol's Warhammer / forging Volendrung.",
      "location": "Largashbur / Giant's Grove"
    },
    {
      "id": "pieces-of-the-past",
      "name": "Pieces of the Past",
      "categoryId": "daedric",
      "order": 7,
      "howToStart": "Read a museum pamphlet or speak to Silus Vesuius at his Dawnstar museum (level 20+).",
      "description": "Recover the pieces of Mehrunes' Razor and decide Silus's fate at the shrine.",
      "location": "Dawnstar / various ruins / Shrine of Mehrunes Dagon",
      "alternatives": [
        "Kill Silus and receive Mehrunes' Razor",
        "Spare Silus (no razor; museum remains)"
      ],
      "note": "ALT PATH: Razor requires killing Silus when Dagon demands it."
    },
    {
      "id": "the-whispering-door",
      "name": "The Whispering Door",
      "categoryId": "daedric",
      "order": 8,
      "howToStart": "After Dragon Rising, hear Jarl Balgruuf's children rumors; speak to Hulda / Farengar / children (level 20+).",
      "description": "Investigate Mephala's influence on Jarl Balgruuf's children and retrieve the Ebony Blade.",
      "location": "Dragonsreach, Whiterun"
    },
    {
      "id": "the-break-of-dawn",
      "name": "The Break of Dawn",
      "categoryId": "daedric",
      "order": 9,
      "howToStart": "Find Meridia's Beacon in a chest (random) or go to Statue to Meridia west of Solitude.",
      "description": "Cleanse Mount Kilkreath of necromancer Malkoran and claim Dawnbreaker.",
      "location": "Kilkreath Ruins"
    },
    {
      "id": "house-of-horrors",
      "name": "The House of Horrors",
      "categoryId": "daedric",
      "order": 10,
      "howToStart": "Vigilant Tyranus outside an abandoned house in Markarth.",
      "description": "Investigate the house, entrap Logrolf, and decide whether to serve Molag Bal.",
      "location": "Abandoned House, Markarth",
      "alternatives": [
        "Complete Molag Bal's demands for the Mace of Molag Bal",
        "Refuse further service (quest fails / no artifact)"
      ],
      "canFail": "Refusing Molag Bal's commands can fail the quest."
    },
    {
      "id": "taste-of-death",
      "name": "The Taste of Death",
      "categoryId": "daedric",
      "order": 11,
      "howToStart": "Speak to Brother Verulus / investigate Hall of the Dead in Markarth; Eola at Reachcliff.",
      "description": "Join Namira's cannibal cult and decide Verulus's fate.",
      "location": "Markarth / Reachcliff Cave",
      "alternatives": [
        "Sacrifice Verulus (Ring of Namira)",
        "Save Verulus / kill cultists (fail Daedric reward)"
      ],
      "canFail": "Killing Eola early or saving Verulus fails the Daedric reward path."
    },
    {
      "id": "the-only-cure",
      "name": "The Only Cure",
      "categoryId": "daedric",
      "order": 12,
      "howToStart": "Contract disease and meet a Khajiit messenger, or go to an Afflicted refuge / Peryite's shrine (level 10+).",
      "description": "Inhale Peryite's fumes and kill the renegade cultist Orchendor in Bthardamz.",
      "location": "Shrine to Peryite / Bthardamz"
    },
    {
      "id": "night-to-remember",
      "name": "A Night to Remember",
      "categoryId": "daedric",
      "order": 13,
      "howToStart": "Drink with Sam Guevenne at any inn (level 14+) during a drinking contest.",
      "description": "Reconstruct a lost night of revelry across Skyrim for Sanguine.",
      "location": "Various (Whiterun start common)",
      "note": "Reward: Sanguine Rose."
    },
    {
      "id": "mind-of-madness",
      "name": "The Mind of Madness",
      "categoryId": "daedric",
      "order": 14,
      "howToStart": "Speak to Dervenin in Solitude about his missing master.",
      "description": "Enter the Pelagius Wing / mindscape and calm Sheogorath's guest.",
      "location": "Blue Palace, Solitude",
      "note": "Reward: Wabbajack."
    },
    {
      "id": "waking-nightmare",
      "name": "Waking Nightmare",
      "categoryId": "daedric",
      "order": 15,
      "howToStart": "Speak to Erandur at the Windpeak Inn in Dawnstar.",
      "description": "End Dawnstar's nightmares by confronting Vaermina's Skull of Corruption in Nightcaller Temple.",
      "location": "Dawnstar / Nightcaller Temple",
      "alternatives": [
        "Allow Erandur to destroy the Skull",
        "Kill Erandur and take the Skull of Corruption"
      ],
      "note": "ALT PATH: keep Erandur as follower-priest vs take Skull of Corruption."
    },
    {
      "id": "tending-the-flames",
      "name": "Tending the Flames",
      "categoryId": "bards",
      "order": 1,
      "howToStart": "Speak to Viarmo at the Bards College in Solitude.",
      "description": "Prove King Olaf's verse, convince the court, and gain College membership during the festival.",
      "location": "Solitude / Dead Men's Respite"
    },
    {
      "id": "rjorns-drum",
      "name": "Rjorn's Drum",
      "categoryId": "bards",
      "order": 2,
      "howToStart": "Giraud Gemane after joining the Bards College.",
      "description": "Recover Rjorn's Drum from Halldir's Cairn / related location for teaching bonuses.",
      "location": "Halldir's Cairn"
    },
    {
      "id": "finns-lute",
      "name": "Finn's Lute",
      "categoryId": "bards",
      "order": 3,
      "howToStart": "Inge Six Fingers after joining.",
      "description": "Recover Finn's Lute from Stony Creek Cave / thieves.",
      "location": "Stony Creek Cave"
    },
    {
      "id": "panteas-flute",
      "name": "Pantea's Flute",
      "categoryId": "bards",
      "order": 4,
      "howToStart": "Pantea Ateia after joining.",
      "description": "Recover Pantea's Flute from Hob's Fall Cave.",
      "location": "Hob's Fall Cave"
    },
    {
      "id": "dawnguard-join",
      "name": "Dawnguard",
      "categoryId": "dawnguard",
      "order": 1,
      "howToStart": "Hear rumors or go to Fort Dawnguard in the Rift; speak to Isran.",
      "description": "Join the re-formed Dawnguard and investigate Dimhollow Crypt.",
      "location": "Fort Dawnguard"
    },
    {
      "id": "awakening",
      "name": "Awakening",
      "categoryId": "dawnguard",
      "order": 2,
      "howToStart": "Isran after Dawnguard.",
      "description": "Search Dimhollow Crypt and free Serana from her sarcophagus.",
      "location": "Dimhollow Crypt"
    },
    {
      "id": "bloodline",
      "name": "Bloodline",
      "categoryId": "dawnguard",
      "order": 3,
      "howToStart": "Continues after Awakening.",
      "description": "Escort Serana home to Castle Volkihar and choose your allegiance at the gate.",
      "location": "Castle Volkihar",
      "alternatives": [
        "Refuse Harkon's gift → remain with Dawnguard",
        "Accept Harkon's gift → become Vampire Lord"
      ],
      "exclusiveGroup": "dg-faction",
      "note": "Branch point: dg-hunter vs dg-vampire follow-ups."
    },
    {
      "id": "a-new-order",
      "name": "A New Order",
      "categoryId": "dawnguard",
      "order": 4,
      "howToStart": "Return to Isran after refusing Harkon (hunter path).",
      "description": "Recruit Florentius, Gunmar, and Sorine to rebuild Fort Dawnguard.",
      "location": "Fort Dawnguard / various",
      "exclusiveGroup": "dg-hunter"
    },
    {
      "id": "bloodstone-chalice",
      "name": "The Bloodstone Chalice",
      "categoryId": "dawnguard",
      "order": 5,
      "howToStart": "Lord Harkon after accepting vampirism (vampire path).",
      "description": "Fill the Bloodstone Chalice at Redwater Spring for the Volkihar court.",
      "location": "Redwater Den / Castle Volkihar",
      "exclusiveGroup": "dg-vampire"
    },
    {
      "id": "prophet-dg",
      "name": "Prophet",
      "categoryId": "dawnguard",
      "order": 6,
      "howToStart": "Isran (hunter) or Harkon (vampire) after the prior faction quest.",
      "description": "Rescue a Moth Priest and use him to read Serana's Elder Scroll.",
      "location": "Forebears' Watchtower / Fort Dawnguard or Volkihar",
      "note": "Exists on both faction paths with location differences."
    },
    {
      "id": "seeking-disclosure",
      "name": "Seeking Disclosure",
      "categoryId": "dawnguard",
      "order": 7,
      "howToStart": "After Prophet.",
      "description": "Locate the Elder Scrolls (Sun and Blood) needed for the prophecy.",
      "location": "Dawnguard HQ or Volkihar",
      "note": "Often tracked as scroll-hunting objectives tied to Dexion's reading."
    },
    {
      "id": "chasing-echoes",
      "name": "Chasing Echoes",
      "categoryId": "dawnguard",
      "order": 8,
      "howToStart": "Serana after obtaining necessary scroll knowledge.",
      "description": "Enter the Soul Cairn via Castle Volkihar's ruined tower to find Valerica.",
      "location": "Castle Volkihar / Soul Cairn",
      "alternatives": [
        "Become a Vampire Lord if still mortal (Serana's offer)",
        "Soul-trap partial solution with soul gem ritual"
      ]
    },
    {
      "id": "beyond-death",
      "name": "Beyond Death",
      "categoryId": "dawnguard",
      "order": 9,
      "howToStart": "Continues in the Soul Cairn.",
      "description": "Help Valerica, battle Durnehviir's keepers, and retrieve the Elder Scroll (Blood).",
      "location": "Soul Cairn"
    },
    {
      "id": "unseen-visions",
      "name": "Unseen Visions",
      "categoryId": "dawnguard",
      "order": 10,
      "howToStart": "After both relevant Elder Scrolls are available.",
      "description": "Perform the Ancestor Glade moth reading to learn the bow's location.",
      "location": "Ancestor Glade"
    },
    {
      "id": "touching-the-sky",
      "name": "Touching the Sky",
      "categoryId": "dawnguard",
      "order": 11,
      "howToStart": "After Unseen Visions.",
      "description": "Retrieve Auriel's Bow from the Forgotten Vale.",
      "location": "Forgotten Vale / Inner Sanctum"
    },
    {
      "id": "kindred-judgment",
      "name": "Kindred Judgment",
      "categoryId": "dawnguard",
      "order": 12,
      "howToStart": "After Touching the Sky.",
      "description": "Lead the final assault on Harkon in the Volkihar cathedral.",
      "location": "Castle Volkihar",
      "note": "DLC main finale for both factions."
    },
    {
      "id": "bolstering-the-ranks",
      "name": "Bolstering the Ranks",
      "categoryId": "dawnguard",
      "order": 20,
      "howToStart": "Isran after A New Order (hunter path).",
      "description": "Find and recruit Florentius Baenius from a hold jail.",
      "location": "Various jails",
      "exclusiveGroup": "dg-hunter"
    },
    {
      "id": "ancient-technology",
      "name": "Ancient Technology",
      "categoryId": "dawnguard",
      "order": 21,
      "howToStart": "Sorine Jurard at Fort Dawnguard (radiant).",
      "description": "Recover Dwemer crossbow schematics for the Dawnguard.",
      "exclusiveGroup": "dg-hunter",
      "radiant": true
    },
    {
      "id": "lost-to-the-ages",
      "name": "Lost to the Ages",
      "categoryId": "dawnguard",
      "order": 22,
      "howToStart": "Read The Aetherium Wars or find a Dwemer mechanism / Katria in Arkngthamz.",
      "description": "Compete with Katria's ghost to forge an Aetherial artifact.",
      "location": "Arkngthamz / Aetherium Forge",
      "alternatives": [
        "Aetherial Crown",
        "Aetherial Shield",
        "Aetherial Staff"
      ],
      "note": "Major Dawnguard side quest; forge choice is permanent per character."
    },
    {
      "id": "hide-and-seek",
      "name": "Hide and Seek",
      "categoryId": "dawnguard",
      "order": 23,
      "howToStart": "Isran / Dawnguard radiant after main progress.",
      "description": "Find and kill a vampire masquerading among the townsfolk.",
      "exclusiveGroup": "dg-hunter",
      "radiant": true
    },
    {
      "id": "hunting-the-monster",
      "name": "Hunting the Monster",
      "categoryId": "dawnguard",
      "order": 24,
      "howToStart": "Gunmar (radiant).",
      "description": "Track a powerful vampire to a dungeon lair.",
      "exclusiveGroup": "dg-hunter",
      "radiant": true
    },
    {
      "id": "cleansing-light",
      "name": "Cleansing Light",
      "categoryId": "dawnguard",
      "order": 25,
      "howToStart": "Isran (radiant).",
      "description": "Destroy a vampire lair designated by the Dawnguard.",
      "exclusiveGroup": "dg-hunter",
      "radiant": true
    },
    {
      "id": "preemptive-strike",
      "name": "Preemptive Strike",
      "categoryId": "dawnguard",
      "order": 26,
      "howToStart": "Gunmar (radiant).",
      "description": "Assault a cave where vampires threaten a settlement.",
      "exclusiveGroup": "dg-hunter",
      "radiant": true
    },
    {
      "id": "jarls-justice",
      "name": "A Jarl's Justice",
      "categoryId": "dawnguard",
      "order": 27,
      "howToStart": "Isran (radiant).",
      "description": "Expose a vampire visiting a jarl's court.",
      "exclusiveGroup": "dg-hunter",
      "radiant": true
    },
    {
      "id": "protecting-the-bloodline",
      "name": "Protecting the Bloodline",
      "categoryId": "dawnguard",
      "order": 28,
      "howToStart": "Fura Bloodmouth / Garan Marethi (vampire radiant).",
      "description": "Stop a new vampire hunter cell or destroy Dawnguard assets.",
      "exclusiveGroup": "dg-vampire",
      "radiant": true
    },
    {
      "id": "culling-the-herd",
      "name": "Culling the Herd",
      "categoryId": "dawnguard",
      "order": 29,
      "howToStart": "Vingalmo (vampire radiant).",
      "description": "Eliminate a designated mortal inconvenience for the court.",
      "exclusiveGroup": "dg-vampire",
      "radiant": true
    },
    {
      "id": "rings-of-blood-magic",
      "name": "Rings of Blood Magic",
      "categoryId": "dawnguard",
      "order": 30,
      "howToStart": "Feran Sadri after Kindred Judgment (vampire path).",
      "description": "Retrieve valuables to commission powerful vampire rings.",
      "exclusiveGroup": "dg-vampire"
    },
    {
      "id": "the-hunt",
      "name": "The Hunt",
      "categoryId": "dawnguard",
      "order": 31,
      "howToStart": "Garan Marethi (vampire radiant).",
      "description": "Assassinate a target for the Volkihar clan.",
      "exclusiveGroup": "dg-vampire",
      "radiant": true
    },
    {
      "id": "deceiving-the-herd",
      "name": "Deceiving the Herd",
      "categoryId": "dawnguard",
      "order": 32,
      "howToStart": "Orthjolf / vampire radiant.",
      "description": "Stage a public vampire scare to manipulate a city.",
      "exclusiveGroup": "dg-vampire",
      "radiant": true
    },
    {
      "id": "destroying-the-dawnguard",
      "name": "Destroying the Dawnguard",
      "categoryId": "dawnguard",
      "order": 33,
      "howToStart": "Garan Marethi after Kindred Judgment (vampire).",
      "description": "Assault Fort Dawnguard and wipe out the hunters.",
      "location": "Fort Dawnguard",
      "exclusiveGroup": "dg-vampire"
    },
    {
      "id": "dragonborn-quest",
      "name": "Dragonborn",
      "categoryId": "dragonborn",
      "order": 1,
      "howToStart": "After Main Quest dragon progress, cultists attack; read their note and travel to Solstheim.",
      "description": "Investigate Miraak's cultists and travel to the Temple of Miraak.",
      "location": "Windhelm docks → Raven Rock / Temple of Miraak"
    },
    {
      "id": "temple-of-miraak",
      "name": "The Temple of Miraak",
      "categoryId": "dragonborn",
      "order": 2,
      "howToStart": "Frea at the Temple of Miraak.",
      "description": "Explore the temple with Frea and free the All-Maker stones' victims temporarily.",
      "location": "Temple of Miraak"
    },
    {
      "id": "fate-of-the-skaal",
      "name": "The Fate of the Skaal",
      "categoryId": "dragonborn",
      "order": 3,
      "howToStart": "Storn Crag-Strider at Skaal Village after The Temple of Miraak.",
      "description": "Cleanse the Wind Stone and learn how Miraak enslaves Solstheim.",
      "location": "Skaal Village / Wind Stone",
      "note": "Also listed among Solstheim sides; core to Dragonborn progression."
    },
    {
      "id": "path-of-knowledge",
      "name": "The Path of Knowledge",
      "categoryId": "dragonborn",
      "order": 4,
      "howToStart": "Storn / Frea after The Fate of the Skaal.",
      "description": "Recover the Black Book from Nchardak with Neloth's help.",
      "location": "Nchardak / Tel Mithryn"
    },
    {
      "id": "gardener-of-men",
      "name": "The Gardener of Men",
      "categoryId": "dragonborn",
      "order": 5,
      "howToStart": "Read the Black Book: Epistolary Acumen / continue after Path of Knowledge.",
      "description": "Bargain with Hermaeus Mora in Apocrypha; Storn learns Miraak's secret at a cost.",
      "location": "Apocrypha / Skaal Village"
    },
    {
      "id": "summit-of-apocrypha",
      "name": "At the Summit of Apocrypha",
      "categoryId": "dragonborn",
      "order": 6,
      "howToStart": "After The Gardener of Men; use Black Book: Winds of Change / final book path.",
      "description": "Defeat Miraak at the summit of Apocrypha.",
      "location": "Apocrypha",
      "note": "Dragonborn DLC finale."
    },
    {
      "id": "build-your-own-home",
      "name": "Build Your Own Home",
      "categoryId": "hearthfire",
      "order": 1,
      "howToStart": "Become Thane (or friendly enough) and purchase a plot from a steward/jarl in Falkreath, Hjaalmarch, or the Pale.",
      "description": "Buy land and construct a homestead wing by wing with sawn logs, quarried stone, and fittings.",
      "location": "Lakeview Manor / Windstad Manor / Heljarchen Hall",
      "alternatives": [
        "Lakeview Manor (Falkreath)",
        "Windstad Manor (Hjaalmarch)",
        "Heljarchen Hall (The Pale)"
      ],
      "note": "Same quest structure for each plot; can own all three."
    },
    {
      "id": "adoption",
      "name": "Adoption",
      "categoryId": "hearthfire",
      "order": 2,
      "howToStart": "Have a house with a child's bed/chest; speak to orphans at Honorhall (after Grelod) or street children.",
      "description": "Adopt up to two children and bring them to a player home.",
      "location": "Riften Honorhall / various cities / player homes",
      "note": "Requires Hearthfire housing furniture; Softly Softly / Connie / Blaise / Sofie / Alesan / Lucia etc."
    },
    {
      "id": "by-the-book-hf",
      "name": "Spare Bedroom / Child's Room Setup",
      "categoryId": "hearthfire",
      "order": 3,
      "howToStart": "Use the drafting table / carpenter's workbench in a homestead or decorate a city house.",
      "description": "Furnish a child's bedroom to enable adoption in that home.",
      "location": "Player homes",
      "note": "Not always a journal quest; tracked here as required Hearthfire setup step."
    },
    {
      "id": "golden-claw",
      "name": "The Golden Claw",
      "categoryId": "side_whiterun",
      "order": 1,
      "howToStart": "Lucan Valerius at Riverwood Trader.",
      "description": "Recover the Golden Claw and the associated claw puzzle from Bleak Falls Barrow.",
      "location": "Riverwood / Bleak Falls Barrow",
      "note": "Overlaps Main Quest Bleak Falls Barrow."
    },
    {
      "id": "blessings-of-nature",
      "name": "Blessings of Nature",
      "categoryId": "side_whiterun",
      "order": 2,
      "howToStart": "Danica Pure-Spring at the Temple of Kynareth, Whiterun.",
      "description": "Retrieve Nettlebane and sap from the Eldergleam to restore Whiterun's Gildergreen.",
      "location": "Whiterun / Orphan Rock / Eldergleam Sanctuary",
      "alternatives": [
        "Take Eldergleam sap (tree dies temporarily)",
        "Use Maurice's new sapling instead"
      ]
    },
    {
      "id": "in-my-time-of-need",
      "name": "In My Time of Need",
      "categoryId": "side_whiterun",
      "order": 3,
      "howToStart": "Alik'r warriors outside Whiterun or Saadia at the Bannered Mare.",
      "description": "Decide whether Saadia or the Alik'r are telling the truth.",
      "location": "Whiterun / Swindler's Den",
      "alternatives": [
        "Protect Saadia",
        "Turn Saadia over to Kematu"
      ],
      "note": "No perfect confirmation in-game; both endings are valid choices."
    },
    {
      "id": "missing-in-action",
      "name": "Missing in Action",
      "categoryId": "side_whiterun",
      "order": 4,
      "howToStart": "Fralia Gray-Mane at her stall / Gray-Mane house in Whiterun.",
      "description": "Investigate Thorald Gray-Mane's capture by the Thalmor and rescue him.",
      "location": "Whiterun / Northwatch Keep",
      "alternatives": [
        "Frontal assault on Northwatch",
        "Imperial missive route if Legion-friendly"
      ]
    },
    {
      "id": "promises-to-keep",
      "name": "Promises to Keep",
      "categoryId": "side_riften",
      "order": 1,
      "howToStart": "Louis Letrush outside Riften / Black-Briar Lodge leads.",
      "description": "Steal Frost the horse from Black-Briar Lodge for Letrush—or keep it.",
      "location": "Riften / Black-Briar Lodge",
      "alternatives": [
        "Deliver Frost to Letrush",
        "Keep Frost",
        "Persuade/extort alternate outcomes"
      ],
      "canFail": "Killing key NPCs early can break the quest."
    },
    {
      "id": "book-of-love",
      "name": "The Book of Love",
      "categoryId": "side_riften",
      "order": 2,
      "howToStart": "Dinya Balu at the Temple of Mara in Riften.",
      "description": "Play matchmaker across Skyrim for Mara's blessing and the Agent of Mara perk.",
      "location": "Riften / various holds"
    },
    {
      "id": "unfathomable-depths",
      "name": "Unfathomable Depths",
      "categoryId": "side_riften",
      "order": 3,
      "howToStart": "From-Deepest-Fathoms on the Riften docks.",
      "description": "Return a Dwemer lexicon to Avanchnzel and survive the memory-echoes.",
      "location": "Riften / Avanchnzel"
    },
    {
      "id": "lights-out",
      "name": "Lights Out!",
      "categoryId": "side_solitude",
      "order": 1,
      "howToStart": "Jaree-Ra on the Solitude docks.",
      "description": "Extinguish the Solitude lighthouse beacon so pirates can wreck a ship—then deal with the betrayal.",
      "location": "Solitude Lighthouse / Wreck of the Icerunner / East Empire warehouse caves",
      "alternatives": [
        "Go along then wipe out the pirates",
        "Betray Jaree-Ra earlier"
      ]
    },
    {
      "id": "man-who-cried-wolf",
      "name": "The Man Who Cried Wolf",
      "categoryId": "side_solitude",
      "order": 2,
      "howToStart": "Falk Firebeard in the Blue Palace after hearing about Wolfskull Cave.",
      "description": "Investigate necromantic activity in Wolfskull Cave.",
      "location": "Solitude / Wolfskull Cave"
    },
    {
      "id": "wolf-queen-awakened",
      "name": "The Wolf Queen Awakened",
      "categoryId": "side_solitude",
      "order": 3,
      "howToStart": "Letter from Falk Firebeard after The Man Who Cried Wolf (level 10+).",
      "description": "Stop Potema's return in the Solitude catacombs.",
      "location": "Temple of the Divines / Solitude Catacombs"
    },
    {
      "id": "blood-on-the-ice",
      "name": "Blood on the Ice",
      "categoryId": "side_windhelm",
      "order": 1,
      "howToStart": "Enter Windhelm's graveyard after seeing a murder scene (timing/bug-sensitive).",
      "description": "Investigate the Windhelm serial murders and identify the killer.",
      "location": "Windhelm / Hjerim",
      "alternatives": [
        "Accuse various suspects; correct killer is Calixto"
      ],
      "canFail": "Known bugs can soft-lock; follow UESP timing (after visiting market/graveyard correctly)."
    },
    {
      "id": "white-phial",
      "name": "The White Phial",
      "categoryId": "side_windhelm",
      "order": 2,
      "howToStart": "Nurelion at The White Phial shop in Windhelm.",
      "description": "Retrieve the White Phial from Forsaken Cave.",
      "location": "Windhelm / Forsaken Cave"
    },
    {
      "id": "repairing-the-phial",
      "name": "Repairing the Phial",
      "categoryId": "side_windhelm",
      "order": 3,
      "howToStart": "Quintus Navale after The White Phial (when Nurelion sickens).",
      "description": "Gather unicorn horn / mammoth tusk powder / soul remnant materials to restore the Phial.",
      "location": "Windhelm / various"
    },
    {
      "id": "rise-in-the-east",
      "name": "Rise in the East",
      "categoryId": "side_windhelm",
      "order": 4,
      "howToStart": "Orthus Endario at the East Empire Company office in Windhelm.",
      "description": "Break the Blood Horker pirates and restore East Empire trade out of Windhelm.",
      "location": "Windhelm / Dawnstar / Japhet's Folly"
    },
    {
      "id": "forsworn-conspiracy",
      "name": "The Forsworn Conspiracy",
      "categoryId": "side_markarth",
      "order": 1,
      "howToStart": "Witness Margret / market attack in Markarth; speak to Eltrys in the shrine of Talos.",
      "description": "Uncover the corrupt conspiracy tying Markarth's leadership to the Forsworn.",
      "location": "Markarth",
      "canFail": "Leaving Markarth at wrong times or killing key NPCs can break the chain."
    },
    {
      "id": "cidhna-mine",
      "name": "No One Escapes Cidhna Mine",
      "categoryId": "side_markarth",
      "order": 2,
      "howToStart": "Automatic arrest after The Forsworn Conspiracy.",
      "description": "Survive Cidhna Mine and choose a side to escape.",
      "location": "Cidhna Mine, Markarth",
      "alternatives": [
        "Side with Madanach (Forsworn escape)",
        "Kill Madanach and escape with Thonar's favor"
      ],
      "note": "Direct sequel to The Forsworn Conspiracy."
    },
    {
      "id": "heart-of-dibella",
      "name": "The Heart of Dibella",
      "categoryId": "side_markarth",
      "order": 3,
      "howToStart": "Speak to a Degaine beggar or visit the Temple of Dibella in Markarth.",
      "description": "Find the next Sybil of Dibella in the countryside and escort her to the temple.",
      "location": "Markarth / Broken Tower Redoubt area",
      "note": "Grants Agent of Dibella perk."
    },
    {
      "id": "lost-expedition",
      "name": "The Lost Expedition",
      "categoryId": "side_markarth",
      "order": 4,
      "howToStart": "Read expedition notes / speak to Calcelmo or find the dig site under Markarth.",
      "description": "Uncover the fate of the Nimhe / Nchuand-Zel research team and recover their journal.",
      "location": "Nchuand-Zel, Markarth"
    },
    {
      "id": "laid-to-rest",
      "name": "Laid to Rest",
      "categoryId": "side_morthal",
      "order": 1,
      "howToStart": "Speak to the Jarl of Morthal / investigate the burned house rumor.",
      "description": "Uncover a vampire plot and destroy Movarth's lair.",
      "location": "Morthal / Movarth's Lair"
    },
    {
      "id": "rising-at-dawn",
      "name": "Rising at Dawn",
      "categoryId": "side_morthal",
      "order": 2,
      "howToStart": "Ask innkeepers about curing vampirism after becoming a vampire; speak to Falion.",
      "description": "Cure vampirism with Falion's black soul gem ritual at dawn.",
      "location": "Morthal",
      "note": "Repeatable cure ritual if you become infected again.",
      "radiant": true
    },
    {
      "id": "gather-wheat-falkreath",
      "name": "Gather Wheat / Chop Wood (Falkreath)",
      "categoryId": "side_falkreath",
      "order": 1,
      "howToStart": "Speak to millers and farmers around Falkreath (e.g. half-hold farms and lumber camps).",
      "description": "Repeatable gathering favors typical of Falkreath's rural economy.",
      "location": "Falkreath Hold",
      "radiant": true
    },
    {
      "id": "falkreath-bounty-dragon",
      "name": "Bounty: Kill a Dragon (Falkreath)",
      "categoryId": "side_falkreath",
      "order": 2,
      "howToStart": "Jarl or steward of Falkreath after dragons appear.",
      "description": "Radiant dragon bounty for Falkreath Hold.",
      "location": "Falkreath Hold",
      "radiant": true
    },
    {
      "id": "falkreath-daedric-pointers",
      "name": "Lod's Dog / Mathies's Grief",
      "categoryId": "side_falkreath",
      "order": 3,
      "howToStart": "Lod (lost dog) or Mathies/Indara at the farm/graves after the child's murder.",
      "description": "Town lead-ins to A Daedra's Best Friend and Ill Met By Moonlight (tracked under Daedric).",
      "location": "Falkreath",
      "note": "See Daedric: A Daedra's Best Friend; Ill Met By Moonlight."
    },
    {
      "id": "dawnstar-museum-lead",
      "name": "Silus Vesuius's Museum",
      "categoryId": "side_dawnstar",
      "order": 1,
      "howToStart": "Read a Mythic Dawn museum pamphlet (level 20+) or visit Silus in Dawnstar.",
      "description": "Opens Pieces of the Past (tracked under Daedric Quests).",
      "location": "Dawnstar",
      "note": "See Daedric: Pieces of the Past."
    },
    {
      "id": "dawnstar-nightmares-lead",
      "name": "Windpeak Inn Nightmares",
      "categoryId": "side_dawnstar",
      "order": 2,
      "howToStart": "Visit the Windpeak Inn and speak with Erandur / worried locals.",
      "description": "Opens Waking Nightmare (tracked under Daedric Quests).",
      "location": "Dawnstar",
      "note": "See Daedric: Waking Nightmare."
    },
    {
      "id": "iron-break-mine",
      "name": "Mine Ore (Iron-Breaker / Quicksilver)",
      "categoryId": "side_dawnstar",
      "order": 3,
      "howToStart": "Speak to mine operators in Dawnstar's Iron-Breaker or Quicksilver mines.",
      "description": "Sell ore and clear mine pests; classic Dawnstar livelihood favors.",
      "location": "Dawnstar mines",
      "radiant": true
    },
    {
      "id": "drowned-sorrows",
      "name": "Drowned Sorrows",
      "categoryId": "side_winterhold",
      "order": 1,
      "howToStart": "Speak to Dagur or Haran at the Frozen Hearth about Ranmir's drinking.",
      "description": "Find out what happened to Isabelle and help Ranmir move on.",
      "location": "Winterhold / Hob's Fall Cave"
    },
    {
      "id": "forgotten-names",
      "name": "Forgotten Names",
      "categoryId": "side_winterhold",
      "order": 2,
      "howToStart": "Read manuals near the Atronach Forge in the Midden under the College.",
      "description": "Unlock Atronach Forge recipes, including forbidden Daedric ones.",
      "location": "The Midden Dark"
    },
    {
      "id": "march-of-the-dead",
      "name": "March of the Dead",
      "categoryId": "side_solstheim",
      "order": 1,
      "howToStart": "Captain Veleth outside Raven Rock after ash spawn attack.",
      "description": "Trace ash spawn to Fort Frostmoth and stop General Falx Carius.",
      "location": "Raven Rock / Fort Frostmoth"
    },
    {
      "id": "final-descent",
      "name": "The Final Descent",
      "categoryId": "side_solstheim",
      "order": 2,
      "howToStart": "Crescius Caerellius in the Raven Rock mine.",
      "description": "Explore the depths of Bloodskal Barrow / Raven Rock Mine and discover Gratian's fate.",
      "location": "Raven Rock Mine / Bloodskal Barrow"
    },
    {
      "id": "served-cold",
      "name": "Served Cold",
      "categoryId": "side_solstheim",
      "order": 3,
      "howToStart": "Councilor Morvayn / Adril Arano after March of the Dead and Final Descent progress.",
      "description": "Uncover an Ulen conspiracy against House Redoran in Raven Rock.",
      "location": "Raven Rock / Ashfallow Citadel"
    },
    {
      "id": "retaking-thirsk",
      "name": "Retaking Thirsk",
      "categoryId": "side_solstheim",
      "order": 4,
      "howToStart": "Speak to the Nords camped outside Thirsk Mead Hall after rieklings took over.",
      "description": "Help Bujold's group reclaim Thirsk from the rieklings.",
      "location": "Thirsk Mead Hall",
      "alternatives": [
        "Complete the reclaim ritual / confront Bujold's lie"
      ],
      "exclusiveGroup": "thirsk-side",
      "note": "ALT PATH: mutually exclusive with Chief of Thirsk Hall."
    },
    {
      "id": "chief-of-thirsk",
      "name": "Chief of Thirsk Hall",
      "categoryId": "side_solstheim",
      "order": 5,
      "howToStart": "Speak to the riekling chief inside Thirsk Mead Hall.",
      "description": "Side with the rieklings, complete their tasks, and become their chief.",
      "location": "Thirsk Mead Hall",
      "exclusiveGroup": "thirsk-side",
      "note": "ALT PATH: mutually exclusive with Retaking Thirsk."
    },
    {
      "id": "new-source-of-stalhrim",
      "name": "A New Source of Stalhrim",
      "categoryId": "side_solstheim",
      "order": 6,
      "howToStart": "Deor Woodcutter / Baldor Iron-Shaper missing from Skaal Village.",
      "description": "Rescue Baldor and secure a stalhrim source from the Thalmor.",
      "location": "Skaal Village / Northshore Landing / Ansilvund-like cave on Solstheim"
    },
    {
      "id": "lost-legacy",
      "name": "Lost Legacy",
      "categoryId": "side_solstheim",
      "order": 7,
      "howToStart": "Tharstan in Skaal Village after main Skaal events.",
      "description": "Explore Vahlok's Tomb with Tharstan and learn of the dragon priest Vahlok.",
      "location": "Vahlok's Tomb"
    },
    {
      "id": "cleansing-the-stones",
      "name": "Cleansing the Stones",
      "categoryId": "side_solstheim",
      "order": 8,
      "howToStart": "Storn after The Fate of the Skaal.",
      "description": "Use the Bend Will shout to cleanse the remaining All-Maker Stones.",
      "location": "Solstheim All-Maker Stones",
      "note": "Follow-up to Fate of the Skaal / Dragonborn main."
    },
    {
      "id": "reluctant-steward",
      "name": "Reluctant Steward",
      "categoryId": "side_solstheim",
      "order": 9,
      "howToStart": "Neloth at Tel Mithryn after arriving on Solstheim.",
      "description": "Find Neloth a new steward in Raven Rock.",
      "location": "Tel Mithryn / Raven Rock"
    },
    {
      "id": "from-the-ashes",
      "name": "From the Ashes",
      "categoryId": "side_solstheim",
      "order": 10,
      "howToStart": "After an ash spawn attack on Tel Mithryn (related to Heart Stone).",
      "description": "Investigate and stop the ash guardian threat tied to Talvas/Neloth's apprentice work.",
      "location": "Tel Mithryn"
    },
    {
      "id": "healing-a-house",
      "name": "Healing a House",
      "categoryId": "side_solstheim",
      "order": 11,
      "howToStart": "Neloth when Tel Mithryn's tower sickens.",
      "description": "Recover a steed / heart stone related cure elements and restore the tower.",
      "location": "Tel Mithryn / nearby ashen areas"
    },
    {
      "id": "old-friends",
      "name": "Old Friends",
      "categoryId": "side_solstheim",
      "order": 12,
      "howToStart": "Neloth during Tel Mithryn quest chain.",
      "description": "Investigate a former apprentice's tower and defeat a dragon priest threat.",
      "location": "Tel Mithryn / Highpoint Tower"
    },
    {
      "id": "wind-and-sand",
      "name": "Wind and Sand",
      "categoryId": "side_solstheim",
      "order": 13,
      "howToStart": "Drop off / purchase related book; or Neloth dialogue about spells.",
      "description": "Bring Neloth research materials related to ash and sand magic.",
      "location": "Tel Mithryn"
    },
    {
      "id": "experimental-subject",
      "name": "Experimental Subject",
      "categoryId": "side_solstheim",
      "order": 14,
      "howToStart": "Neloth at Tel Mithryn.",
      "description": "Allow Neloth to perform a magical experiment on you.",
      "location": "Tel Mithryn",
      "alternatives": [
        "Endure the experiment",
        "Refuse"
      ]
    },
    {
      "id": "telvanni-research",
      "name": "Telvanni Research",
      "categoryId": "side_solstheim",
      "order": 15,
      "howToStart": "Neloth at Tel Mithryn (radiant).",
      "description": "Fetch research materials from dungeons for Neloth's experiments.",
      "radiant": true
    },
    {
      "id": "lost-knowledge-db",
      "name": "Lost Knowledge",
      "categoryId": "side_solstheim",
      "order": 16,
      "howToStart": "Read a Black Book or speak to Neloth about additional Black Books.",
      "description": "Locate additional Black Books across Solstheim for Apocrypha powers.",
      "location": "Solstheim / Apocrypha",
      "note": "Collectible Black Book side content tied to Dragonborn."
    },
    {
      "id": "forbidden-legend",
      "name": "Forbidden Legend",
      "categoryId": "misc_world",
      "order": 1,
      "howToStart": "Read Lost Legends / find a Gauldur writ; investigate Folgunthur, Geirmund's Hall, and Saarthal.",
      "description": "Defeat the Gauldurson brothers and reforge the Gauldur Amulet.",
      "location": "Folgunthur / Geirmund's Hall / Saarthal / Reachwater Rock"
    },
    {
      "id": "frostflow-abyss",
      "name": "Frostflow Abyss",
      "categoryId": "misc_world",
      "order": 2,
      "howToStart": "Enter Frostflow Lighthouse and read the journal.",
      "description": "Discover the fate of the lighthouse family and purge the chaurus nest below.",
      "location": "Frostflow Lighthouse"
    },
    {
      "id": "the-pale-lady",
      "name": "The Pale Lady",
      "categoryId": "misc_world",
      "order": 3,
      "howToStart": "Enter Frostmere Crypt; overhear/bandit quest about a stolen sword.",
      "description": "Resolve the conflict over the Pale Blade and the Pale Lady's wrath.",
      "location": "Frostmere Crypt",
      "alternatives": [
        "Take the Pale Blade",
        "Return the Pale Blade to the pedestal"
      ]
    },
    {
      "id": "ancestral-worship",
      "name": "Ancestral Worship",
      "categoryId": "misc_world",
      "order": 4,
      "howToStart": "Golldir outside Hillgrund's Tomb.",
      "description": "Help Golldir purge a necromancer from his family's tomb.",
      "location": "Hillgrund's Tomb"
    },
    {
      "id": "silenced-tongues",
      "name": "Silenced Tongues",
      "categoryId": "misc_world",
      "order": 5,
      "howToStart": "Find Heddic's journal in Volunruud.",
      "description": "Explore Volunruud, defeat Elder Kvenel, and claim the Eduj/Okin weapons.",
      "location": "Volunruud"
    },
    {
      "id": "a-scroll-for-anska",
      "name": "A Scroll for Anska",
      "categoryId": "misc_world",
      "order": 6,
      "howToStart": "Anska inside High Peak / Vokun's tomb entrance (High Gate Ruins).",
      "description": "Help Anska retrieve a scroll from Vokun's dragon priest lair.",
      "location": "High Gate Ruins"
    },
    {
      "id": "impatience-of-a-saint",
      "name": "Impatience of a Saint",
      "categoryId": "misc_world",
      "order": 7,
      "howToStart": "Find a page of Saint Jiub's Opus in the Soul Cairn (Dawnguard).",
      "description": "Recover all pages for Jiub and receive his annotated opus / unique jewel.",
      "location": "Soul Cairn"
    },
    {
      "id": "repentance",
      "name": "Repentance",
      "categoryId": "misc_world",
      "order": 8,
      "howToStart": "Illia outside Darklight Tower.",
      "description": "Help Illia stop her mother's hagraven ritual atop Darklight Tower.",
      "location": "Darklight Tower"
    },
    {
      "id": "yngol-barrow",
      "name": "Yngol Barrow",
      "categoryId": "misc_world",
      "order": 9,
      "howToStart": "Enter Yngol Barrow on the coast near Windhelm; optionally with the Coral Dragon Claw from Winterhold.",
      "description": "Solve the barrow puzzle and face Yngol's shade for the Helm of Yngol.",
      "location": "Yngol Barrow"
    },
    {
      "id": "evil-in-waiting",
      "name": "Evil in Waiting",
      "categoryId": "misc_world",
      "order": 11,
      "howToStart": "Enter Valthume; speak to the spirit Valdar.",
      "description": "Gather vessels and defeat Hevnoraak before he rises.",
      "location": "Valthume"
    },
    {
      "id": "melka-and-petra",
      "name": "The Blind Cliff Bastion",
      "categoryId": "misc_world",
      "order": 12,
      "howToStart": "Free Melka in Blind Cliff Cave.",
      "description": "Help the hagraven Melka kill Petra and receive the Staff of Hag's Wrath.",
      "location": "Blind Cliff Cave"
    },
    {
      "id": "infiltration-karthwasten",
      "name": "Infiltration",
      "categoryId": "misc_world",
      "order": 13,
      "howToStart": "Speak to Ainethach in Karthwasten about Silver-Blood thugs at Sanuarach Mine.",
      "description": "Resolve the mine takeover by force or persuasion.",
      "location": "Karthwasten",
      "alternatives": [
        "Drive out the Silver-Bloods",
        "Side with the enforcers"
      ]
    },
    {
      "id": "the-black-books-misc",
      "name": "Black Book Discoveries",
      "categoryId": "misc_world",
      "order": 14,
      "howToStart": "Find Black Books in Solstheim dungeons during exploration.",
      "description": "Enter Apocrypha chapters for standing-stone-like power choices.",
      "location": "Solstheim / Apocrypha",
      "note": "Pairs with Dragonborn Lost Knowledge."
    },
    {
      "id": "angarvunde",
      "name": "Angarvunde",
      "categoryId": "misc_world",
      "order": 15,
      "howToStart": "Medresi Dran at Angarvunde.",
      "description": "Help Medresi open the ruins; survive the trap and claim the treasure.",
      "location": "Angarvunde"
    },
    {
      "id": "bounty-falkreath",
      "name": "Bounty: Kill Bandit Leader (Falkreath)",
      "categoryId": "side_falkreath",
      "order": 4,
      "howToStart": "Read a hold bounty or speak to the Falkreath steward/jarl.",
      "description": "Radiant bounty to clear a bandit leader in Falkreath Hold.",
      "location": "Falkreath Hold",
      "radiant": true
    },
    {
      "id": "bounty-dawnstar",
      "name": "Bounty: Kill Bandit Leader (The Pale)",
      "categoryId": "side_dawnstar",
      "order": 4,
      "howToStart": "Bounty letter or steward in Dawnstar.",
      "description": "Radiant bounty targeting a bandit leader in the Pale.",
      "location": "The Pale",
      "radiant": true
    },
    {
      "id": "bounty-winterhold",
      "name": "Bounty: Winterhold Hold",
      "categoryId": "side_winterhold",
      "order": 3,
      "howToStart": "Jarl / steward of Winterhold bounty letters.",
      "description": "Radiant bounty quests issued from Winterhold.",
      "location": "Winterhold Hold",
      "radiant": true
    },
    {
      "id": "fetch-me-that-book",
      "name": "Fetch Me That Book!",
      "categoryId": "side_winterhold",
      "order": 4,
      "howToStart": "Urag gro-Shub in the Arcanaeum.",
      "description": "Find a specific rare book for the College library.",
      "location": "College of Winterhold",
      "radiant": true
    },
    {
      "id": "salt-for-arcadia",
      "name": "Rare Gifts",
      "categoryId": "side_whiterun",
      "order": 5,
      "howToStart": "Arcadia at Arcadia's Cauldron (and similar favor NPCs).",
      "description": "Bring a requested rare ingredient or gift item to a citizen.",
      "location": "Whiterun",
      "radiant": true
    },
    {
      "id": "caught-red-handed",
      "name": "Caught Red Handed",
      "categoryId": "side_riften",
      "order": 4,
      "howToStart": "Svana at Haelga's Bunkhouse in Riften.",
      "description": "Collect Haelga's Marks of Dibella from her lovers.",
      "location": "Riften"
    },
    {
      "id": "the-raid",
      "name": "The Raid",
      "categoryId": "side_riften",
      "order": 5,
      "howToStart": "Wesply / Sarthis-related Riften warehouse crime (after talking to the jarl's steward about skooma).",
      "description": "Raid a skooma depot tied to Riften's underground trade.",
      "location": "Riften"
    },
    {
      "id": "supply-and-demand",
      "name": "Supply and Demand",
      "categoryId": "side_riften",
      "order": 6,
      "howToStart": "Continues from The Raid / jarl's crime concerns.",
      "description": "Shut down the skooma operation's source outside the city.",
      "location": "Riften / surrounding caves"
    },
    {
      "id": "the-bonds-of-matrimony",
      "name": "The Bonds of Matrimony",
      "categoryId": "misc_world",
      "order": 16,
      "howToStart": "Wear an Amulet of Mara and speak to an interested NPC; arrange the ceremony at the Temple of Mara.",
      "description": "Court and marry an eligible character.",
      "location": "Temple of Mara, Riften",
      "note": "Global marriage quest."
    },
    {
      "id": "bounty-solitude",
      "name": "Bounty: Haafingar",
      "categoryId": "side_solitude",
      "order": 4,
      "howToStart": "Steward / bounty notes in Solitude.",
      "description": "Radiant bounty for Haafingar Hold.",
      "location": "Haafingar",
      "radiant": true
    },
    {
      "id": "tending-flames-pointer",
      "name": "Elisif's Tribute",
      "categoryId": "side_solitude",
      "order": 5,
      "howToStart": "Jarl Elisif the Fair in the Blue Palace after joining her court / hearing about Torygg.",
      "description": "Place Torygg's war horn at a Shrine of Talos for Elisif.",
      "location": "Solitude / Shrine of Talos"
    },
    {
      "id": "naruina-quest",
      "name": "Dungeon Delving (Calcelmo)",
      "categoryId": "side_markarth",
      "order": 5,
      "howToStart": "Calcelmo in Understone Keep.",
      "description": "Retrieve a specific Dwemer artifact from a ruin for Calcelmo.",
      "location": "Markarth / Dwemer ruins",
      "radiant": true
    },
    {
      "id": "skoor-the-blood",
      "name": "Skilled Apprenticeship / Delivery (Markarth)",
      "categoryId": "side_markarth",
      "order": 6,
      "howToStart": "Ghorza gra-Bagol or other Markarth crafters.",
      "description": "Miscellaneous crafting apprenticeship and delivery favors in Markarth.",
      "location": "Markarth"
    }
  ]
};
