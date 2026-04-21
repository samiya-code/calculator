# Modern Calculator

A beautifully designed, feature-rich calculator web application with a modern UI inspired by contemporary design trends.

## Features

### Core Functionality
- **Basic Operations**: Addition, subtraction, multiplication, and division
- **Advanced Functions**: Percentage calculations and sign toggle
- **Decimal Support**: Full floating-point arithmetic
- **Error Handling**: Graceful handling of division by zero and invalid operations

### User Interface
- **Modern Design**: Clean, card-based layout with smooth animations
- **Dark/Light Theme**: Toggle between light and dark themes with persistent storage
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Micro-interactions**: Hover effects, button animations, and ripple effects
- **Professional Typography**: Inter font family for optimal readability

### Enhanced Features
- **Calculation History**: View and reuse previous calculations
- **Keyboard Support**: Full keyboard navigation and shortcuts
- **Local Storage**: Saves theme preferences and calculation history
- **Touch Optimized**: Mobile-friendly touch targets and gestures

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with CSS variables, animations, and responsive design
- **Vanilla JavaScript**: No dependencies, pure JavaScript implementation
- **Google Fonts**: Inter font family for typography

## File Structure

```
calculator/
|-- index.html          # Main HTML structure
|-- style.css           # Complete styling with theme support
|-- script.js           # Calculator logic and interactions
|-- README.md           # This file
```

## Getting Started

1. **Download or clone** the files to your local machine
2. **Open `index.html`** in your web browser
3. **Start calculating!** No installation or setup required

## Usage

### Mouse/Touch Controls
- Click number buttons to input values
- Use operator buttons (+, -, ×, ÷) for calculations
- Press "=" to calculate results
- Use "AC" to clear all entries
- Double-click the display to show/hide history

### Keyboard Shortcuts
- **Numbers (0-9)**: Input digits
- **Operators (+, -, *, /)**: Perform operations
- **Enter or =**: Calculate result
- **Escape or C**: Clear calculator
- **Backspace**: Delete last digit
- **%**: Percentage calculation
- **.**: Decimal point

### Theme Toggle
- Click the sun/moon icon in the header to switch between light and dark themes
- Theme preference is automatically saved

## Design Highlights

### Visual Design
- **Gradient Background**: Eye-catching purple gradient for light theme
- **Card Layout**: Clean white card with subtle shadows
- **Color System**: Consistent color palette using CSS variables
- **Typography**: Clean, modern Inter font with proper hierarchy

### Interactions
- **Button Animations**: Smooth hover and active states
- **Ripple Effects**: Material Design-inspired ripple on button clicks
- **Transitions**: Smooth theme switching and panel animations
- **Responsive Scaling**: Adapts beautifully to different screen sizes

### Accessibility
- **Keyboard Navigation**: Full keyboard support for accessibility
- **Clear Visual Hierarchy**: Distinct button types and sizes
- **High Contrast**: Proper contrast ratios in both themes
- **Touch Targets**: Appropriately sized buttons for mobile use

## Browser Compatibility

- **Chrome/Chromium**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Mobile Browsers**: Optimized for iOS Safari and Android Chrome

## Performance

- **Lightweight**: No external dependencies
- **Fast Loading**: Optimized CSS and JavaScript
- **Smooth Animations**: Hardware-accelerated transitions
- **Efficient Storage**: LocalStorage for persistent data

## Customization

### Colors
Modify the CSS variables in `:root` to customize the color scheme:

```css
:root {
    --primary-color: #6366f1;
    --primary-hover: #4f46e5;
    --secondary-color: #f3f4f6;
    /* ... other variables */
}
```

### Fonts
Change the font by modifying the Google Fonts import in `index.html` and updating the `font-family` property in `style.css`.

### Animations
Adjust animation speeds and effects by modifying the transition and animation properties in the CSS.

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve this calculator.

---

**Created with modern web standards for a delightful user experience.**
