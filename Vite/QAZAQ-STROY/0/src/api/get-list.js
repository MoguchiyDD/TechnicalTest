export default function getList() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Тестовые данные
            const tableSettings = {
                docdate: {
                    represent:   'Дата',
                    name:        'docdate',
                    order:       '0',
                    textAlign:   '',
                    columnWidth: '224'
                },
                attachment: {
                    represent:   'Приложение',
                    name:        'attachment',
                    order:       '1',
                    textAlign:   '',
                    columnWidth: '224'
                },
                contract: {
                    represent:   'Договор',
                    name:        'contract',
                    order:       '2',
                    textAlign:   '',
                    columnWidth: '224'
                },
                project: {
                    represent:   'Проект',
                    name:        'project',
                    order:       '3',
                    textAlign:   '',
                    columnWidth: '224'
                },
                contractor: {
                    represent:   'Подрядчик',
                    name:        'contractor',
                    order:       '4',
                    textAlign:   '',
                    columnWidth: '224'
                },
                block: {
                    represent:   'Блок',
                    name:        'block',
                    order:       '5',
                    textAlign:   '',
                    columnWidth: '142'
                },
                jobtype: {
                    represent:   'Вид работы',
                    name:        'jobtype',
                    order:       '6',
                    textAlign:   '',
                    columnWidth: '224'
                },
                sum: {
                    represent:   'Сумма',
                    name:        'sum',
                    order:       '7',
                    textAlign:   'right',
                    columnWidth: '224'
                },
                sumfact: {
                    represent:   'Фактическая сумма',
                    name:        'sumfact',
                    order:       '8',
                    textAlign:   'right',
                    columnWidth: '224'
                },
                deadline: {
                    represent:   'Сроки',
                    name:        'deadline',
                    order:       '9',
                    textAlign:   '',
                    columnWidth: '224'
                }
            }
            const tableData = {
                settings: tableSettings,
                columns:  [
                    'uuid',
                    'docdate',
                    'attachment',
                    'contract',
                    'project',
                    'contractor',
                    'block',
                    'jobtype',
                    'sum',
                    'sumfact',
                    'deadline'
                ],
                rows: [
                    [
                        '89326d90-fd15-4070-a8a0-538e2c9dd386',
                        '2024-09-24 05:50:02',
                        {
                            'v': 'e9dc9d58-bf0e-4b89-9279-034670d4c5a7',
                            'r': 'Приложение №1'
                        },
                        {
                            'v': '07f69275-c25c-45fa-a400-8a42e5c50046',
                            'r': 'Договор №1'
                        },
                        {
                            'v': '63aa23d9-ee6f-47e4-9e68-2d98f806e68c',
                            'r': 'Проект №1'
                        },
                        {
                            'v': 'd4aa8832-f923-4f9c-8bfb-a43dcf60fad2',
                            'r': 'TОО Подрядчик 1'
                        },
                        '1КБ1',
                        {
                            'v': 'fefbbb09-9b3e-4ce8-91e0-a51ea0329183',
                            'r': 'Работы 1'
                        },
                        '225000',
                        '280000',
                        '20 д.'
                    ],
                    [
                        'f9ef23a6-cb5a-464a-8a40-eed08c6d3f91',
                        '2024-09-24 05:50:02',
                        {
                            'v': 'd5ab98bb-37c3-4bb6-bb7c-2d51498f5519',
                            'r': 'Приложение №2'
                        },
                        {
                            'v': '1b212854-ac1d-4ff3-8f88-52edd1af26e9',
                            'r': 'Договор №2'
                        },
                        {
                            'v': 'd19d1e8c-7d8e-4eea-bbe6-d2b61cf5d6b0',
                            'r': 'Проект №2'
                        },
                        {
                            'v': '410a55db-e395-42f2-96d8-15a09697167f',
                            'r': 'TОО Подрядчик 2'
                        },
                        '2КБ2',
                        {
                            'v': '35aae10c-f2ac-4dc1-9c53-c66dbdad0286',
                            'r': 'Работы 2'
                        },
                        '230000',
                        '285000',
                        '21 д.'
                    ],
                    [
                        '65fc8fc4-5686-46c6-8796-3558260395ce',
                        '2024-09-24 05:50:02',
                        {
                            'v': 'c43ac144-0645-49ea-ba37-b18273e75056',
                            'r': 'Приложение №3'
                        },
                        {
                            'v': '9351653a-8a3b-48a6-bb2f-32cc5adc3b20',
                            'r': 'Договор №3'
                        },
                        {
                            'v': 'af7e2a38-697e-4d7b-a70e-686fbf07bef0',
                            'r': 'Проект №3'
                        },
                        {
                            'v': 'e6f1da71-40ac-4084-847c-9555eedd62ee',
                            'r': 'TОО Подрядчик 3'
                        },
                        '3КБ3',
                        {
                            'v': '3ddfdd71-79d8-496f-99ef-eb598b984f86',
                            'r': 'Работы 3'
                        },
                        '235000',
                        '290000',
                        '22 д.'
                    ],
                    [
                        '3cd8469d-70c6-4776-bca5-b5eaccbead70',
                        '2024-09-24 05:50:02',
                        {
                            'v': '1d762816-c67b-4e7f-83dd-1318ad6c19bf',
                            'r': 'Приложение №4'
                        },
                        {
                            'v': '889ab8fb-e979-40e0-95a9-fb6447aa6543',
                            'r': 'Договор №4'
                        },
                        {
                            'v': '3c0cfc4f-b29f-4cce-bcc8-cee56572491f',
                            'r': 'Проект №4'
                        },
                        {
                            'v': '4be58741-8562-4f7d-9000-7a9b8a84dcd5',
                            'r': 'TОО Подрядчик 4'
                        },
                        '4КБ4',
                        {
                            'v': 'f3485c28-c94f-4ed4-98ca-94a2ccd14731',
                            'r': 'Работы 4'
                        },
                        '240000',
                        '295000',
                        '23 д.'
                    ],
                    [
                        'a9056d02-6f58-4334-8423-faf9cccbeaeb',
                        '2024-09-24 05:50:02',
                        {
                            'v': '597a0e5f-038d-4c76-bd08-46c725915af4',
                            'r': 'Приложение №5'
                        },
                        {
                            'v': 'e955abdc-e90f-433a-932d-8a319523373d',
                            'r': 'Договор №5'
                        },
                        {
                            'v': 'a0ac5c97-ba87-4f94-9bca-48a42d2ac230',
                            'r': 'Проект №5'
                        },
                        {
                            'v': 'bb9d3319-8bb3-4110-9a7d-ba6c6701872c',
                            'r': 'TОО Подрядчик 5'
                        },
                        '5КБ5',
                        {
                            'v': '47ca48b6-4316-4ac7-8c37-eeeb96956064',
                            'r': 'Работы 5'
                        },
                        '245000',
                        '300000',
                        '24 д.'
                    ]
                ]
            }
    
            resolve(tableData);
        }, 250);
    });
}