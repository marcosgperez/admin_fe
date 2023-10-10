export const MenuList = [
    //Dashboard
    {
        title: 'Dashboard',	
        classsChange: 'mm-collapse',		
        iconStyle: <i className="fas fa-home"/>,
        content: [
            
           
            {
                title: 'Reservations',
                to: 'guest-list',                
            },
            // {
            //     title: 'Reservation Deta',
            //     to: 'guest-details',                
            // },
            {
                title: 'Staff List',
                to: 'concierge-list',                
            },
            {
                title: 'Room List',
                to: 'room-list',                
            },
            {
                title: 'Reviews',
                to: 'reviews',                
            },
            {
                title: 'Task',
                to: 'task',                
            },			
        ],
    },

    //Charts
    {
        title: 'Charts',	
        classsChange: 'mm-collapse',
        iconStyle: <i className="fas fa-chart-line"></i>,
        to: 'chart-rechart',
        // content: [
            
        //     {
        //         title: 'RechartJs',
        //         to: 'chart-rechart',					
        //     },
        //     {
        //         title: 'Chartjs',
        //         to: 'chart-chartjs',					
        //     },
        //     {
        //         title: 'Sparkline',
        //         to: 'chart-sparkline',					
        //     },
        //     {
        //         title: 'Apexchart',
        //         to: 'chart-apexchart',					
        //     },
        // ]
    },
 
    //Table
    {
        title:'Table',
        classsChange: 'mm-collapse',
        iconStyle: <i className="fas fa-table"></i>,
        content : [
            {
                title:'Table Filtering',
                to: 'table-filtering',
            },
            {
                title:'Table Sorting',
                to: 'table-sorting',
            },
            {
                title:'Bootstrap',
                to: 'table-bootstrap-basic',
            },
           

        ]
    },
    // //Pages
    // {
    //     title:'Pages',
    //     classsChange: 'mm-collapse',
    //     iconStyle: <i className="fas fa-clone"></i>,
    //     content : [
    //         {
    //             title:'Error',
    //             hasMenu : true,
    //             content : [
    //                 {
    //                     title: 'Error 400',
    //                     to : 'page-error-400',
    //                 },
    //                 {
    //                     title: 'Error 403',
    //                     to : 'page-error-403',
    //                 },
    //                 {
    //                     title: 'Error 404',
    //                     to : 'page-error-404',
    //                 },
    //                 {
    //                     title: 'Error 500',
    //                     to : 'page-error-500',
    //                 },
    //                 {
    //                     title: 'Error 503',
    //                     to : 'page-error-503',
    //                 },
    //             ],
    //         },
    //         {
    //             title:'Lock Screen',
    //             to: 'page-lock-screen',
    //         },

    //     ]
    // },
    
]