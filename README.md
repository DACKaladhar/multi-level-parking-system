# Backend Setup

This folder contains the backend components of the project, built using Flask. Follow the steps below to set up the backend environment.

## Prerequisites

Make sure you have Python installed on your system. You can check your Python version by running:

```bash
python --version
```

If you're on macOS or Linux, ensure you're using Python 3:

```bash
python3 --version
```

## Installation Steps

1. **Create a Virtual Environment (Optional but recommended)**

   To create a virtual environment, navigate to the backend folder and run:

   ```bash
   python3 -m venv venv
   ```

   Activate the virtual environment:

   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
   - On Windows:
     ```bash
     .\venv\Scripts\activate
     ```

2. **Install Required Packages**

   Install the necessary packages using `pip`:

   ```bash
   pip install Flask
   pip install Flask-SQLAlchemy
   pip install flask-cors
   ```

   If you are using Python 3, you may want to use `pip3` instead:

   ```bash
   pip3 install Flask
   pip3 install Flask-SQLAlchemy
   pip3 install flask-cors
   ```

## Running the Backend

To run the Flask application, use the following command:

```bash
flask run
```

Make sure you have set the `FLASK_APP` environment variable if necessary:

```bash
export FLASK_APP=app.py  # For macOS/Linux
set FLASK_APP=app.py     # For Windows
```

## API Documentation

Refer to the API documentation for details on endpoints and usage.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:
### `yarn` - installs all the required packages
### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Elaborated and paraphrased version of project description:

**Project Overview:**
I’m developing a React + TypeScript application tailored for managing multilevel parking systems in large multinational corporations (MNCs). This app is designed to support a variety of vehicle types, including 2/3-wheelers, special vehicles, dual parking, and electric vehicles. Key features include slot booking, real-time updates, maintenance management, data analytics on parking demand, and much more! Contributions to this project are highly encouraged.

**Problem Solved:**
This app is specifically designed for MNCs with structured and organized parking areas where employees follow systematic parking protocols. The application addresses several critical issues:

1. **Efficient Electric Vehicle Parking Management:** Given the limited availability of electric parking slots, this app maximizes the utilization of available spaces by implementing a timely booking system. This ensures that all electric vehicles are accommodated efficiently.
  
2. **Seamless Communication of Parking Updates:** Companies can provide regular updates regarding their parking facilities, such as maintenance activities or availability, through the app in a visually appealing and user-friendly manner. This keeps employees informed and engaged.

3. **Enhanced Employee Engagement:** The app fosters a closer connection between the company and its employees by allowing employees to monitor the status of their vehicles in real time. This includes updates on parking status, charging progress, and more.

4. **Streamlined Vehicle Management:** The app minimizes the effort required by employees to manage their vehicles. The company’s administrative panel, guided by the application, takes care of everything from booking to charging, allowing employees to focus on their work without worrying about their vehicles.

**Learning and Development:**
I initiated this project immediately after completing my internship at Microsoft, aiming to apply the skills and knowledge I gained during my time there. My focus areas include:

1. **Writing Production-Level Code:** Ensuring that the codebase is of high quality and suitable for deployment in a real-world environment.
  
2. **Creating Highly Reusable Components:** Developing modular and reusable components that can be easily integrated and adapted for future needs.

3. **Ensuring Easy Refactoring and Code Quality:** Writing clean, maintainable code that is easy to refactor and adheres to best practices in terms of quality and reliability.

4. **Focusing on Performance:** Optimizing the app for performance to ensure it runs smoothly even under heavy usage.

5. **Implementing Telemetry and Business Intelligence (BI):** Utilizing dashboards and other tools to monitor the app’s performance and user behavior, providing valuable insights for future improvements.

6. **Adopting Strong Version Control and Code Review Practices:** Managing the project with a focus on perfecting git version control, conducting thorough code reviews, and maintaining a clean and organized repository.

7. **Documenting Technical and Design Aspects:** Creating detailed technical and design documentation to ensure clarity and ease of understanding for all team members.

8. **Following Agile Methodology:** Implementing Agile principles to manage the project efficiently, ensuring continuous improvement and adaptability throughout the development process.

9. **Conducting Unit Testing:** Validating the functionality of the app through comprehensive unit testing to maintain high standards of reliability and performance.

As the lead of this project, my goal is to develop a production-grade application while enhancing my learning curve by gaining practical experience in building an app from scratch. I am also involving pre-final year students and inviting friends to contribute, fostering a collaborative environment where we can all gain valuable experience in teamwork and communication. By following rigorous software development principles, including design documentation, regular meetings, bug bashes, and unit test validation, I aim to build a robust, production-ready application. I plan to incorporate scenario markers and monitor them using dashboards to ensure the app meets production standards.
