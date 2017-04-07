const dataFields = {
  Tm: {description: "Team",
       chartable: true,
       numeric: false,
       scale: 'ordinal'
      },
  NICK: {description: "Team",
       chartable: false,
       numeric: false,
       scale: 'ordinal'
     },
  GMS: {description: "Games",
       chartable: false,
       numeric: false,
       scale: 'ordinal'
     },
  DEF_TOT_DRIVES: {description: "Total Defensive Drives",
       chartable: true,
       numeric: true,
       scale: 'linear'
     },
  DEF_TOT_PLAYS: {description: "Total Defensive Plays",
       chartable: true,
       numeric: true,
       scale: 'linear'
      },
  DEF_SCORE_PCT: {description: "% of Drives Scored (Def.)",
       chartable: true,
       numeric: true ,
       scale: 'linear'
     },
  DEF_TO_PCT: {description: "% of Drives w/Turnovers (Def.)",
       chartable: true,
       numeric: true,
       scale: 'linear'
      },
  DEF_PLAYS_PER_DRIVE: {description: "Plays / Drive (Def.)",
       chartable: true,
       numeric: true,
       scale: 'linear'
       },
  DEF_YDS_PER_DRIVE: {description: "Yards / Drive (Def.)",
       chartable: true,
       numeric: true,
       scale: 'linear'
      },
  DEF_AVG_START: {description: "Avg Start Position (Def.)",
       chartable: true,
       numeric: true,
       scale: 'linear'
     },
  DEF_AVG_PTS: {description: "Points / Drive (Def.)",
       chartable: true,
       numeric: true,
       scale: 'linear'
      },
  OFF_DRIVES: {description: "Total Offensive Drives",
       chartable: true,
       numeric: true,
       scale: 'linear'
      },
  OFF_PLAYS: {description: "Total Offensive Plays",
       chartable: true,
       numeric: true,
       scale: 'linear'
      },
  OFF_SCORE_PCT: {description: "% of Drives Scored (Off.)",
       chartable: true,
       numeric: true,
       scale: 'linear'
      },
  OFF_TO_PCT: {description: "% of Drives w/Turnovers (Off.)",
       chartable: true,
       numeric: true,
       scale: 'linear'
      },
  OFF_PLAYS_PER_DRIVE: {description: "Plays / Drive (Off.)",
       chartable: true,
       numeric: true,
       scale: 'linear'
      },
  OFF_YDS_PER_DRIVE: {description: "Yards / Drive (Off.)",
       chartable: true,
       numeric: true,
       scale: 'linear'
      },
  OFF_AVG_START: {description: "Avg Start Position (Off.)",
       chartable: true,
       numeric: true,
       scale: 'linear'
      },
  OFF_AVG_PTS: {description: "Points / Drive (Off.)",
       chartable: true,
       numeric: true,
       scale: 'linear'
      },
  WINS: {description: "Wins",
       chartable: true,
       numeric: true,
       scale: 'linear'
      },
  LOSS: {description: "Losses",
       chartable: true,
       numeric: true,
       scale: 'linear'
      },
  TIES: {description: "Ties",
       chartable: true,
       numeric: true,
       scale: 'linear'
      }
}

export default dataFields
