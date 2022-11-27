// logic from project 14-28

module.exports = {
    format_date: (date) => {
        // Custom helper 'format_date' that takes in a timestamp, formats it as M/D/YYYY
          return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`
        }
};

