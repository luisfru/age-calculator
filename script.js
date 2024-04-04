document.addEventListener('DOMContentLoaded', function() {
    const day = document.getElementById("day");
    const month = document.getElementById("month");
    const year = document.getElementById("year");
    const age = document.getElementById("age");
    const form = document.querySelector(".form");
    const submitButton = document.getElementById('submit')

    day.addEventListener('input', validateInput);
    month.addEventListener('input', validateInput);
    year.addEventListener('input', validateInput);

    function validateInput() {
        const dayValue = day.value.trim();
        const monthValue = month.value.trim();
        const yearValue = year.value.trim();
    
        const dayValid = dayValue !== '' && dayValue >= 1 && dayValue <= 31;
        const monthValid = monthValue !== '' && monthValue >= 1 && monthValue <= 12;
        const yearValid = yearValue !== '' && yearValue >= 1990 && yearValue <= 2024;
    
        if (dayValid && monthValid && yearValid) {
            submitButton.removeAttribute('disabled');
            submitButton.classList.remove('disabled');
            day.classList.remove('error');
            month.classList.remove('error');
            year.classList.remove('error');
        } else {
            submitButton.setAttribute('disabled', '');
            submitButton.classList.add('disabled');
            if (!dayValid) {
                day.classList.add('error');
            } else {
                day.classList.remove('error');
            }
            if (!monthValid) {
                month.classList.add('error');
            } else {
                month.classList.remove('error');
            }
            if (!yearValid) {
                year.classList.add('error');
            } else {
                year.classList.remove('error');
            }
        }
    }
    
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const currentDate = new Date();
        const formattedDate = formatDate(currentDate);
        const givenDate = `${day.value}/${month.value}/${year.value}`;
        const ageResult = calculateAge(givenDate, formattedDate);
       age.innerHTML = `${ageResult.years} years <br>${ageResult.months} months<br> ${ageResult.days} days`;
    });

    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return { day, month, year };
    }

    function calculateAge(birthDate, currentDate) {
        const birthParts = birthDate.split('/');
        const currentParts = currentDate;

        const birthDay = parseInt(birthParts[0], 10);
        const birthMonth = parseInt(birthParts[1], 10);
        const birthYear = parseInt(birthParts[2], 10);

        const currentDay = currentParts.day;
        const currentMonth = currentParts.month;
        const currentYear = currentParts.year;

        let ageYears = currentYear - birthYear;
        let ageMonths = currentMonth - birthMonth;
        let ageDays = currentDay - birthDay;

        if (ageDays < 0) {
            ageMonths--;
            const monthDays = new Date(currentYear, currentMonth - 1, 0).getDate(); 
            ageDays += monthDays;
        }

        if (ageMonths < 0) {
            ageYears--;
            ageMonths += 12;
        }

        return { years: ageYears, months: ageMonths, days: ageDays };
    }
});