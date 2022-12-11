$(function(){
    
    function templateTableHeadingColumn(title, offset) {
        return `
            <div class="col text-center">
                <p class="h5">${title}</p>
                <span class="small">${offset}</span>
            </div>
        `
    }

    function templateTableBodyColumn(hoursData) {
        return `
            <div class="col">
                <div class="container">

                    ${Object.entries(hoursData).map(function([_, data]) {
                        return `
                            <div class="row">
                                <div class="col border-top border-secondary">${data.display}</div>
                                <div class="col border-top border-secondary ${data.colourClass}"></div>
                            </div>
                        `
                    }).join('')}

                </div>
            </div>
        `
    }

    function display(data) {
        const tableHeadingRow = $('#table-heading-row');
        const tableBodyRow = $('#table-body-row');
        
        data.timezones.forEach(function(item) {
            tableHeadingRow.append(
                templateTableHeadingColumn(
                    item.title, 
                    moment.tz(item.timezone).format("Z z")
                )
            );
            
            const hoursData = {};
            [...Array(24).keys()].forEach(function(hour) {
                adjustedTime = moment()
                    .hours(hour)
                    .minutes(0)
                    .tz(item.timezone)

                hoursData[hour] = {
                    display: adjustedTime.format("HH:mm"),
                    colourClass: item.hours.available.indexOf(Number(adjustedTime.format("H"))) === -1 ? '' : 'bg-success'
                }
            })
            
            tableBodyRow.append(
                templateTableBodyColumn(hoursData)
            )
        })
    }

    const data = {
        timezones: [
            {
                title: "London",
                timezone: "Europe/London",
                hours: {
                    available: [9,10,11,12,13,14,15,16,17]
                }
            },
            {
                title: "New York",
                timezone: "America/New_York",
                hours: {
                    available: [9,10,11,12,13,14,15,16,17]
                }
            },
            {
                title: "Herzliya",
                timezone: "Asia/Jerusalem",
                hours: {
                    available: [9,10,11,12,13,14,15,16,17]
                }
            },
            {
                title: "Singapore",
                timezone: "Asia/Singapore",
                hours: {
                    available: [9,10,11,12,13,14,15,16,17]
                }
            },
            {
                title: "Bengaluru",
                timezone: "Asia/Kolkata",
                hours: {
                    available: [9,10,11,12,13,14,15,16,17]
                }
            }
        ]
    };
    
    display(data);
})