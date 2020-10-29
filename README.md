# Pikachu11 Discord Bot
<p>
  Pikachu11 is a Discord Bot which acts as a playground for experimenting with Artificial Intelligence and Image Recognition.
</p>

## AI Project #1 - Chili Grading
  <p>
    Chili image data set are taken from the AGTECH Hackathon hosted by MDEC.<br />
    The Chili grading category are divided into 6 category, that is:<br />
  </p>
  <ol>
    <li>Grade A - Ripe</li>
    <li>Grade A - Not Ripe</li>
    <li>Grade B - Ripe</li>
    <li>Grade B - Not Ripe</li>
    <li>Grade C - Ripe</li>
    <li>Grade C - Not Ripe</li>
  </ol>

<!-- insert screenshot -->
### Chili Grading Prediction - User Input
<!-- insert screenshot user input -->
<img src="https://user-images.githubusercontent.com/50144145/97593609-d17e3000-1a3c-11eb-95c5-88bff3f1f88a.jpg" width="400">

### Chili Grading Prediction - Result
<!-- insert screenshot result -->
<img src="https://user-images.githubusercontent.com/50144145/97593619-d3e08a00-1a3c-11eb-9d07-51528ebdccb0.jpg" width="400">

<p>
  The <b>precision, recall and average precision (AP)</b> for this chili grading model is:
</p>
  
  Chili Grading Model |
  --- |
  `Precision: 74.7%` |
  `Recall: 51.2%` |
  `Average Precision (AP): 71.1%` |
<br />

## AI Project #2 - Pneumonia Detection
<p>
  Chest X-ray image data set are taken from Kaggle.<br />
  The Pneumonia detection category are divided into 2 category, that is:<br />
</p>
<ol>
    <li>Normal</li>
    <li>Pneumonia</li>
</ol>

<!-- insert screenshot -->
### Pneumonia Detection Prediction - User Input
<!-- insert screenshot user input -->
<img src="https://user-images.githubusercontent.com/50144145/97594623-d1cafb00-1a3d-11eb-934d-775e0ebdc8c7.jpg" width="400">

### Pneumonia Detection Prediction - Result
<!-- insert screenshot result -->
<img src="https://user-images.githubusercontent.com/50144145/97594629-d2fc2800-1a3d-11eb-98dc-d94bb0e5cadc.jpg" width="400">
<img src="https://user-images.githubusercontent.com/50144145/97594617-d0013780-1a3d-11eb-9974-ccec8e3f1981.jpg" width="400">

<p>
  The <b>precision, recall and average precision (AP)</b> for this pneumonia detection model is:
</p>
  
  Pneumonia Detection Model |
  --- |
  `Precision: 93.4%` |
  `Recall: 93.4%` |
  `Average Precision (AP): 96.9%` |
<br />

## How it works
<p>
  The images are trained using Microsoft Azure Custom Vision, then export the model as TensorFlow
  and perform all the function in JavaScript.js on Node.js.<br /><br />
  Since the images are trained using "quick train", the free training service without incurring actual charges, the <b>precision, recall and average precision (AP)</b>
  are highly affected, which results in an inaccurate and sometimes wrong predictions of the actual predictions of a user's image.
</p>
