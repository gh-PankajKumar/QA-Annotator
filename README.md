# QA Annotator Tool

This is a simple web app I made to help create SQuAD-like datasets for my PhD work and also learn react/django.

Of course, this app is not perfect and there will be areas of improvements. I will not be updating this project anymore as it is served its purpose (a way to make a SQuAD-like evaluation dataset more easily).

![](/docs/HomePage.png)

## Installation
```sh
    git clone https://github.com/gh-PankajKumar/QA-Annotator.git
    cd QA-Annotator
```
### Backend

1. **Install the backend dependencies:**

    ```sh
    cd backend
    pip install -r requirements.txt
    ```

2. **Apply migrations:**
    
    ```sh
    python manage.py migrate
    ```
    
3. **Run the backend server:**
    ```sh
    python manage.py runserver
    ```

### Frontend

1. **Navigate to the frontend directory:**
    ```sh
    cd frontend
    ```

2. **Install the frontend dependencies:**
    ```sh
    npm install
    ```

3. **Run the frontend development server:**
    ```sh
    npm run dev
    ```

## Usage

1. **Upload Context:**
    - On the homepage, click the "Upload Context" button to upload a CSV file containing context paragraphs.

2. **Annotate QA Pairs:**
    - Navigate through the uploaded contexts using the navigation buttons.
    - Type your question in the provided textarea.
    - Highlight the answer in the context and click the "Answer" button.
    - Click "Submit" to save the QA pair.

3. **Manage QA Data:**
    - View the list of QA pairs for the current context.
    - Select and delete QA pairs if needed.
    - Export the QA data to a CSV file using the "Export Data" button.

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.
