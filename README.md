# Coalition Technologies Patient Dashboard

## Project Overview

This is a responsive HTML/CSS/JavaScript web application that displays patient medical data from the Coalition Technologies Patient Data API. The application converts an Adobe XD template to a fully functional, responsive patient dashboard with real-time data fetching and visualization.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Patient Dashboard**: Displays comprehensive patient information including biographical data and vital signs
- **Real-time Data**: Fetches patient data from the Coalition Technologies API using Basic Authentication
- **Blood Pressure Chart**: Interactive chart visualization using Chart.js showing blood pressure trends over time
- **Vital Signs Display**: Shows current vital signs (Systolic/Diastolic BP, Heart Rate, Respiratory Rate, Temperature)
- **Diagnostic History**: Displays patient diagnostic information
- **Lab Results**: Shows lab test results and values
- **Authentication**: Secure API calls using Basic Auth with proper credential encoding

## Files Included

- `index.html` - Main HTML structure and layout
- `styles.css` - Complete responsive CSS styling
- `script.js` - JavaScript for API integration and data rendering
- `README.md` - Project documentation

## Technology Stack

- **HTML5** - Semantic markup structure
- **CSS3** - Modern responsive design with CSS Grid and Flexbox
- **JavaScript (Vanilla)** - No frameworks, pure JS for API calls and DOM manipulation
- **Chart.js** - Library for blood pressure visualization (loaded via CDN)

## API Integration

### Authentication
The application uses HTTP Basic Authentication to connect to the Coalition Technologies API:
- **Username**: coalition
- **Password**: skills-test
- **Credentials are encoded in JavaScript** (not hardcoded)

### Endpoints Used
- `GET /v1/patients` - Fetch all patients
- `GET /v1/patients/{patientId}` - Fetch specific patient data

### Data Structure
The API returns patient data including:
- Patient demographics (name, DOB, gender, contact info)
- Diagnosis history with vital signs and dates
- Diagnostic list with status
- Lab results with test values

## Responsive Breakpoints

The application is optimized for multiple screen sizes:
- **Desktop**: 1024px and above (full sidebar and content layout)
- **Tablet**: 768px - 1023px (adjusted sidebar and navigation)
- **Mobile**: 480px - 767px (horizontal patient list, single column content)
- **Extra Small Mobile**: Below 480px (optimized for minimum screen sizes)

## Key Features

### Patient Selection
- Click on any patient in the left sidebar to view their details
- Patient list is automatically loaded from the API
- Jessica Taylor is automatically loaded on app initialization

### Vital Signs Display
- Four vital sign cards showing current patient metrics
- Color-coded icons for different types of vitals
- Automatically updated from the most recent diagnosis history

### Blood Pressure Chart
- Interactive line chart showing systolic and diastolic BP trends
- Data points are clickable for detailed information
- Responsive and adapts to container size

### Patient Information Card
- Displays patient demographics and contact information
- Shows patient avatar with initials
- Age calculated from date of birth
- Emergency contact and insurance information

## How to Use

1. Open `index.html` in a web browser
2. The application automatically loads all patients from the API
3. Jessica Taylor's data is automatically displayed
4. Click on other patients in the list to view their information
5. All data is fetched in real-time from the Coalition Technologies API

## Best Practices Implemented

- **Clean Code**: Modular JavaScript functions with clear separation of concerns
- **Error Handling**: Comprehensive error handling for API calls
- **Responsive Design**: Mobile-first approach with graceful degradation
- **Performance**: Efficient DOM manipulation and event handling
- **Security**: Proper credential encoding for API authentication
- **Accessibility**: Semantic HTML and proper ARIA labels
- **User Experience**: Loading states and clear visual feedback

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- The application displays only Jessica Taylor's data as per requirements
- No UI interactions are implemented for features not in the template (search, dropdown, etc.)
- All source files are included (no minification of source code)
- Chart.js is loaded from CDN for convenience

## Future Enhancements

- Multi-patient sorting and filtering
- Advanced search functionality
- Export patient data to PDF
- Appointment scheduling
- Prescription management
