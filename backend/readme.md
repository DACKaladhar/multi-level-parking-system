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
