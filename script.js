document.getElementById('resultForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const studentId = document.getElementById('student_id').value;
    const name = document.getElementById('name').value;

    // Sample results with scores, subjects, and names
    const resultsData = {
        'OTA/2023/1346': {
            name: 'Kamaldeen Rauf',
            subjects: [
                { subject: 'Math', score: 85, total: 94 },
                { subject: 'Science', score: 80, total: 92 },
                { subject: 'History', score: 94, total: 98 },
                { subject: 'BSTD', score: 83, total: 99 },
                { subject: 'NVE', score: 89, total: 95 },
                { subject: 'CCA', score: 84, total: 98 },
                { subject: 'English', score: 81, total: 81 },
                { subject: 'PVS', score: 92, total: 99 },
                { subject: 'IRS', score: 89, total: 99 },
                { subject: 'Yoruba', score: 87, total: 97 },
                { subject: 'Arabic', score: 80, total: 96 }
            ]
        },
        'OTA/2023/1354': {
            name: 'Sulaiman Abdullah',
            subjects: [
                { subject: 'Math', score: 90, total: 94 },
                { subject: 'Science', score: 92, total: 92 },
                { subject: 'History', score: 96, total: 98 },
                { subject: 'BSTD', score: 95, total: 99 },
                { subject: 'NVE', score: 92, total: 95 },
                { subject: 'CCA', score: 91, total: 98 },
                { subject: 'English', score: 75, total: 81 },
                { subject: 'PVS', score: 98, total: 99 },
                { subject: 'IRS', score: 98, total: 99 },
                { subject: 'Yoruba', score: 97, total: 97 },
                { subject: 'Arabic', score: 96, total: 96 }
            ]
        },
        'OTA/2023/1355': {
            name: 'Abdulmujeeb Adeyanju',
            subjects: [
                { subject: 'Math', score: 75, total: 94 },
                { subject: 'Science', score: 85, total: 92 },
                { subject: 'History', score: 88, total: 98 },
                { subject: 'BSTD', score: 92, total: 99 },
                { subject: 'NVE', score: 80, total: 95 },
                { subject: 'CCA', score: 91, total: 98 },
                { subject: 'English', score: 70, total: 81 },
                { subject: 'PVS', score: 87, total: 99 },
                { subject: 'IRS', score: 99, total: 99 },
                { subject: 'Yoruba', score: 93, total: 97 },
                { subject: 'Arabic', score: 85, total: 96 }
            ]
        },
        'OTA/2023/1352': {
            name: 'Sulaiman Abdulrahman',
            subjects: [
                { subject: 'Math', score: 94, total: 94 },
                { subject: 'Science', score: 83, total: 92 },
                { subject: 'History', score: 98, total: 98 },
                { subject: 'BSTD', score: 99, total: 98 },
                { subject: 'NVE', score: 95, total: 95 },
                { subject: 'CCA', score: 98, total: 98 },
                { subject: 'English', score: 77, total: 81 },
                { subject: 'PVS', score: 99, total: 99 },
                { subject: 'IRS', score: 98, total: 99 },
                { subject: 'Yoruba', score: 95, total: 97 },
                { subject: 'Arabic', score: 87, total: 96 }
            ]
        }
    };

    // Function to convert position number to ordinal
    function getOrdinal(n) {
        const suffixes = ["th", "st", "nd", "rd"];
        const value = n % 100;
        return n + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]);
    }

    // Function to determine grade based on score
    function getGrade(score) {
        if (score >= 75) {
            return 'A';
        } else if (score >= 69) {
            return 'B';
        } else if (score >= 50) {
            return 'C';
        } else {
            return 'F';
        }
    }

    // Find the specific student's result based on student ID
    const result = resultsData[studentId];

    // Check if the student exists and the name matches (case-insensitive)
    if (result) {
        if (result.name.toLowerCase() === name.toLowerCase()) {

            // Update the result container with the student's name and ID
            document.getElementById('studentName').textContent = result.name;

            // Display result in the table
            const tbody = document.querySelector('#resultTable tbody');
            tbody.innerHTML = ''; // Clear previous results

            // Initialize totals
            let totalScore = 0;
            let totalMaxScore = 0;

            // Calculate individual scores
            result.subjects.forEach((subject) => {
                const percentage = ((subject.score / 100) * 100).toFixed(2); // Calculate percentage based on 100
                const grade = getGrade(subject.score);
                const row = `<tr>
                    <td>${subject.subject}</td>
                    <td>${subject.score}</td>
                    <td>${percentage}%</td>
                    <td>${grade}</td>
                    <td>${subject.total}</td>
                </tr>`;
                tbody.innerHTML += row;

                // Accumulate scores and totals
                totalScore += subject.score;
                totalMaxScore += subject.total; // Use actual total for each subject
            });

            // Calculate total percentage
            const totalPercentage = ((totalScore / (100 * result.subjects.length)) * 100).toFixed(2);

            // Get the grade for the total percentage
            const totalGrade = getGrade(totalPercentage);

            // Calculate overall position
            const overallPosition = Object.values(resultsData)
                .map(student => {
                    const studentTotalScore = student.subjects.reduce((acc, subject) => acc + subject.score, 0);
                    return studentTotalScore;
                })
                .sort((a, b) => b - a)
                .indexOf(totalScore) + 1;

            // Get the ordinal representation
            const ordinalPosition = getOrdinal(overallPosition);

            // Add a total row
            const totalRow = `<tr>
                <td><strong>Total</strong></td>
                <td><strong>${totalScore}</strong></td>
                <td><strong>${totalPercentage}%</strong></td>
                <td><strong>${totalGrade}</strong></td>
                <td><strong>${totalMaxScore}</strong></td>           
            </tr>`;
            tbody.innerHTML += totalRow;

            // Add overall position row with ordinal
            const positionRow = `<tr>
                <td colspan="4"><strong>Overall Position</strong></td>
                <td><strong>${ordinalPosition}</strong></td>
            </tr>`;
            tbody.innerHTML += positionRow;

            // Show result container
            document.getElementById('resultContainer').style.display = 'block';

            // Handle PDF download
            document.getElementById('downloadBtn').onclick = function() {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();

                // Set document title and styling
                doc.setFontSize(20);
                doc.text("Student Result Report", 14, 20);
                doc.setFontSize(12);
                doc.text(`Student ID: ${studentId}`, 14, 30);
                doc.text(`Name: ${result.name}`, 14, 40);

                // Add each subject's result to the PDF
                result.subjects.forEach((subject, index) => {
                    const percentage = ((subject.score / 100) * 100).toFixed(2);
                    const grade = getGrade(subject.score);
                    doc.text(`Subject: ${subject.subject}`, 14, 50 + index * 10);
                    doc.text(`Score: ${subject.score}`, 100, 50 + index * 10);
                    doc.text(`Total: ${subject.total}`, 130, 50 + index * 10);
                    doc.text(`Percentage: ${percentage}%`, 160, 50 + index * 10);
                    doc.text(`Grade: ${grade}`, 190, 50 + index * 10);
                });

                // Add total position to PDF
                doc.text(`Total Score: ${totalScore}`, 14, 50 + result.subjects.length * 10 + 10);
                doc.text(`Total Max Score: ${totalMaxScore}`, 100, 50 + result.subjects.length * 10 + 10);
                doc.text(`Total Percentage: ${totalPercentage}%`, 160, 50 + result.subjects.length * 10 + 10);
                doc.text(`Total Grade: ${totalGrade}`, 190, 50 + result.subjects.length * 10 + 10);
                doc.text(`Overall Position: ${ordinalPosition}`, 14, 50 + result.subjects.length * 10 + 20);

                // Add space before next section
                doc.setFontSize(12);
                doc.text("Thank you for using the School Result Portal!", 14, 50 + result.subjects.length * 10 + 30);

                // Save the PDF
                doc.save('result.pdf');
            };

            // Clear the form after submission
            document.getElementById('resultForm').reset();

            // Add an event listener to clear the results if a different name is entered
            document.getElementById('name').addEventListener('input', function() {
                if (name.toLowerCase() !== this.value.toLowerCase()) {
                    document.getElementById('resultContainer').style.display = 'none';
                }
            });

        } else {
            alert('Name does not match the student ID.');
            // Hide the result container if invalid input
            document.getElementById('resultContainer').style.display = 'none';
        }
    } else {
        alert('Invalid student ID.');
        // Hide the result container if invalid input
        document.getElementById('resultContainer').style.display = 'none';
    }
});
