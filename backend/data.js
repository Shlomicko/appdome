const mockTreeData = {
  nodes: [
    {
      id: '1',
      label: 'Documents',
      category: 'documents',
      children: [
        {
          id: '1.1',
          label: 'Work',
          category: 'documents',
          children: [
            { id: '1.1.1', label: 'Resume', category: 'documents' },
            { id: '1.1.2', label: 'Project_Plan', category: 'documents' },
          ],
        },
        {
          id: '1.2',
          label: 'Personal',
          category: 'documents',
          children: [
            { id: '1.2.1', label: 'Budget', category: 'documents' },
            { id: '1.2.2', label: 'Journal', category: 'documents' },
          ],
        },
      ],
    },
    {
      id: '2',
      label: 'Events',
      category: 'events',
      children: [
        {
          id: '2.1',
          label: 'Conferences',
          category: 'events',
          children: [
            {
              id: '2.1.1',
              label: 'AngularCon_2024',
              category: 'events',
              children: [],
            },
            {
              id: '2.1.2',
              label: 'JSWorld_2024',
              category: 'events',
              children: [],
            },
          ],
        },
        {
          id: '2.2',
          label: 'Meetups',
          category: 'events',
          children: [
            {
              id: '2.2.1',
              label: 'Frontend_Meetup',
              category: 'events',
              children: [],
            },
            {
              id: '2.2.2',
              label: 'Tech_Talks',
              category: 'events',
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: '3',
      label: 'Movies',
      category: 'movies',
      children: [
        {
          id: '3.1',
          label: 'Action',
          category: 'movies',
          children: [
            { id: '3.1.1', label: 'Die_Hard', category: 'movies' },
            { id: '3.1.2', label: 'Mad_Max', category: 'movies' },
          ],
        },
        {
          id: '3.2',
          label: 'Comedy',
          category: 'movies',
          children: [
            { id: '3.2.1', label: 'Superbad', category: 'movies' },
            { id: '3.2.2', label: 'Step_Brothers', category: 'movies' },
          ],
        },
      ],
    },
  ],
};

module.exports = {mockTreeData};
