/**
 * Bookkeeping Catch-Up Estimator Scoring Engine
 * Calculates estimated hours and cost to catch up on bookkeeping
 */

export function getDrivers(score, inputs) {
  const drivers = [];

  // Check for reconciliation gap
  if (inputs.reconciled === 2 || inputs.reconciled === 3) {
    drivers.push("Accounts have not been reconciled");
  }

  // Check for high transaction volume
  if (inputs.txnTier >= 2) {
    drivers.push("High transaction volume requires more categorization");
  }

  // Check for multiple platforms
  if (inputs.platforms === 2) {
    drivers.push("Multiple payment platforms need integration");
  }

  // Check for mixed personal/business
  if (inputs.mixedPersonal >= 1) {
    drivers.push("Personal and business expenses need separation");
  }

  // Check for time since last update
  if (inputs.lastUpdated >= 2) {
    drivers.push("Significant time gap since books were updated");
  }

  // Check for payroll behind
  if (inputs.payroll === 2) {
    drivers.push("Payroll records need to be brought current");
  }

  // Check for multiple bank accounts
  if (inputs.bankAccounts >= 2) {
    drivers.push("Multiple bank accounts increase reconciliation work");
  }

  // Check for multiple credit cards
  if (inputs.cards >= 2) {
    drivers.push("Multiple credit cards add categorization complexity");
  }

  // Return top 3 drivers
  return drivers.slice(0, 3);
}

export function calcScore(inputs) {
  let s = 0;

  // Time factors (Q2: lastUpdated, Q10: reconciled)
  // lastUpdated: 0=this month, 1=1-3mo, 2=3-6mo, 3=6+mo, 4=never
  const lastUpdatedScores = [0, 5, 15, 25, 30];
  s += lastUpdatedScores[inputs.lastUpdated] || 0;

  // reconciled: 0=all, 1=some, 2=none/unsure
  const reconciledScores = [0, 10, 20];
  s += reconciledScores[inputs.reconciled] || 0;

  // Volume factors (Q3: bankAccounts, Q4: cards, Q5: txnTier)
  // bankAccounts: 0=1, 1=2-3, 2=4+
  const bankScores = [0, 8, 18];
  s += bankScores[inputs.bankAccounts] || 0;

  // cards: 0=none, 1=1, 2=2-3, 3=4+
  const cardScores = [0, 3, 8, 15];
  s += cardScores[inputs.cards] || 0;

  // txnTier: 0=<50, 1=50-150, 2=150-300, 3=300+
  const txnScores = [0, 10, 20, 35];
  s += txnScores[inputs.txnTier] || 0;

  // Complexity flags (Q6-9)
  // mixedPersonal: 0=no, 1=occasionally, 2=frequently/unsure
  if (inputs.mixedPersonal === 1) s += 10;
  if (inputs.mixedPersonal === 2) s += 20;

  // payroll: 0=no, 1=yes up to date, 2=yes behind
  if (inputs.payroll === 2) s += 15;

  // contractors: 0=no, 1=yes
  if (inputs.contractors === 1) s += 5;

  // platforms: 0=no, 1=one, 2=multiple
  if (inputs.platforms === 1) s += 5;
  if (inputs.platforms === 2) s += 12;

  // Cap at 100
  s = Math.min(s, 100);

  // Determine tier and hours
  let tier, hours;
  if (s <= 24) {
    tier = 'Low';
    hours = '4–8';
  } else if (s <= 49) {
    tier = 'Moderate';
    hours = '8–14';
  } else if (s <= 74) {
    tier = 'High';
    hours = '14–24';
  } else {
    tier = 'Complex';
    hours = '24–40';
  }

  // Calculate cost range (using default $75-100/hr range)
  const hourLow = parseInt(hours.split('–')[0]);
  const hourHigh = parseInt(hours.split('–')[1]);
  const costLow = hourLow * 75;
  const costHigh = hourHigh * 100;

  return {
    score: s,
    tier,
    hours,
    costLow,
    costHigh,
    drivers: getDrivers(s, inputs)
  };
}
