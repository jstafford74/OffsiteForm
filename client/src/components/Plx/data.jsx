const textData = [
    {
        start: '.StickyText-trigger',
        duration: '100vh',
        properties: [
            {
                startValue: 0,
                endValue: -100,
                unit: 'vh',
                property: 'translateY',
            },
            {
                startValue: 0,
                endValue: 1,
                property: 'opacity',
            },
        ],
    },
    {
        start: '.StickyText-trigger',
        startOffset: '60vh',
        duration: '30vh',
        properties: [
            {
                startValue: -50,
                endValue: -100,
                unit: 'vh',
                property: 'translateY',
            },
            {
                startValue: 1,
                endValue: 0,
                property: 'opacity',
            },
        ],
    },
];