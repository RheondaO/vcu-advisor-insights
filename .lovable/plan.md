

# VCU SFMC Institutional Gap Analysis Dashboard

A high-fidelity React analytics dashboard with a dark glassmorphism theme, VCU gold accents, and full interactivity.

---

## Visual Design Theme

- **Background**: Deep dark gradient (#0a0a0a to #1a1a1a) with warm amber undertones
- **Cards**: Glassmorphism style with `backdrop-blur`, semi-transparent backgrounds, and subtle gold/white borders
- **Accent Color**: VCU Gold (#FFB300) for headers, active tabs, and CTAs
- **Typography**: Inter font family with high-contrast white text
- **Semantic Colors**: Green for good standing, red for high gaps, yellow for medium risk

---

## Dashboard Layout

### Header Section
- Title: "VCU SFMC Institutional Gap Analysis Dashboard"
- Refresh button with "Last Refreshed" timestamp
- Export Data (CSV) button - functional download of filtered data

### Top Row - KPI Cards
1. **Good Standing** - 83% with green background
2. **Average Gap** - $5,450 with red styling
3. **Total Unmet Need** - $2.2M with "(Gap > $5k)" subtitle
4. **High Risk Students** - Counter showing count of high-risk students

### Filter Panel (Right Side)
- **Dropdowns**: Semester, Residency, Student Level
- **Checkboxes**: Show Contact Information, Show Academic Standing
- All filters actively update charts and tables

---

## Visualization Components

### Secondary Metrics Section
- **Bar Chart**: "Average Gap by Residency" comparing Out-of-State vs In-State
- **Installment Plans Card**: Shows count (342)
- **Adoption Rate Card**: Shows percentage (68%)

### Main Visualization Area (Tabbed)
- **Tab 1**: Gap Analysis (summary statistics)
- **Tab 2**: Enrollment Trends - Line chart with Total Enroll vs New Enroll (Jan-Dec)
- **Tab 3**: Student Performance metrics

### Flagged Student Table
- Columns: Student ID, Credit Hours, Calculated Gap, Risk Level
- Risk Level shown with colored status dots (Red/Yellow/Green)
- Sortable and responsive to filters

---

## Data & Functionality

### Mock Dataset (200+ students)
- Fields: student_id, residency, gap_amount, risk_score, credit_hours, semester, student_level, enrollment_date
- Realistic distribution of values for meaningful filtering

### Interactive Features
- Clickable tabs switch between visualization views
- Filter dropdowns and checkboxes dynamically update all components
- CSV export downloads filtered data
- Refresh button updates timestamp
- Responsive design optimized for desktop/landscape viewing

---

## Technical Implementation
- Built with React + TypeScript
- Charts powered by Recharts (already installed)
- Tailwind CSS for styling with custom dark theme
- Shadcn UI components for dropdowns, checkboxes, tabs, and tables

