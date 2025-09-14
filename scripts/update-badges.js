#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function getCoverageData() {
  try {
    const coveragePath = path.join(
      __dirname,
      '..',
      'coverage',
      'coverage-summary.json',
    );
    if (!fs.existsSync(coveragePath)) {
      console.warn(
        'Coverage file not found. Run "npm run test:coverage" first.',
      );
      return null;
    }

    const coverageData = JSON.parse(fs.readFileSync(coveragePath, 'utf8'));
    return coverageData.total;
  } catch (error) {
    console.error('Error reading coverage data:', error.message);
    return null;
  }
}

function getCoverageColor(percentage) {
  if (percentage >= 80) return 'brightgreen';
  if (percentage >= 60) return 'yellow';
  if (percentage >= 40) return 'orange';
  return 'red';
}

function updateBadges() {
  const readmePath = path.join(__dirname, '..', 'README.md');

  if (!fs.existsSync(readmePath)) {
    console.error('README.md not found!');
    process.exit(1);
  }

  let readmeContent = fs.readFileSync(readmePath, 'utf8');
  const coverage = getCoverageData();

  if (coverage) {
    const coveragePercent = coverage.lines.pct;
    const coverageColor = getCoverageColor(coveragePercent);

    const coverageBadgePattern =
      /!\[Coverage\]\(https:\/\/img\.shields\.io\/badge\/Coverage-[\d.]+%25-\w+\?logo=vitest&logoColor=white\)/;
    const newCoverageBadge = `![Coverage](https://img.shields.io/badge/Coverage-${coveragePercent}%25-${coverageColor}?logo=vitest&logoColor=white)`;

    readmeContent = readmeContent.replace(
      coverageBadgePattern,
      newCoverageBadge,
    );

    console.log(
      `✅ Coverage badge updated: ${coveragePercent}% (${coverageColor})`,
    );
  }

  fs.writeFileSync(readmePath, readmeContent);
  console.log('📄 README.md updated successfully!');
}

if (require.main === module) {
  updateBadges();
}

module.exports = { updateBadges, getCoverageData };
