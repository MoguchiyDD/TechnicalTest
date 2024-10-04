export default function getList() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
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
                        '2024-04-12 05:50:02',
                        {
                            'v': 'e9dc9d58-bf0e-4b89-9279-034670d4c5a7',
                            'r': 'Приложение 123'
                        },
                        {
                            'v': '07f69275-c25c-45fa-a400-8a42e5c50046',
                            'r': 'PR-TMS3-126'
                        },
                        {
                            'v': '63aa23d9-ee6f-47e4-9e68-2d98f806e68c',
                            'r': 'Super Duper'
                        },
                        {
                            'v': 'd4aa8832-f923-4f9c-8bfb-a43dcf60fad2',
                            'r': 'Finast'
                        },
                        '3',
                        {
                            'v': 'fefbbb09-9b3e-4ce8-91e0-a51ea0329183',
                            'r': 'Монолитные работы'
                        },
                        '2122.39',
                        '2122.39',
                        '48 дн.'
                    ],
                    [
                        'f9ef23a6-cb5a-464a-8a40-eed08c6d3f91',
                        '2024-04-19 05:50:02',
                        {
                            'v': 'd5ab98bb-37c3-4bb6-bb7c-2d51498f5519',
                            'r': 'Приложение 12'
                        },
                        {
                            'v': '1b212854-ac1d-4ff3-8f88-52edd1af26e9',
                            'r': 'PR-NRZB-12'
                        },
                        {
                            'v': 'd19d1e8c-7d8e-4eea-bbe6-d2b61cf5d6b0',
                            'r': 'Britches of Georgetown'
                        },
                        {
                            'v': '410a55db-e395-42f2-96d8-15a09697167f',
                            'r': 'Seamans Furniture'
                        },
                        '4',
                        {
                            'v': '35aae10c-f2ac-4dc1-9c53-c66dbdad0286',
                            'r': 'РМонолитные работы'
                        },
                        '575.17',
                        '575.17',
                        '90 дн.'
                    ],
                    [
                        '65fc8fc4-5686-46c6-8796-3558260395ce',
                        '2024-04-19 05:50:02',
                        {
                            'v': 'c43ac144-0645-49ea-ba37-b18273e75056',
                            'r': 'Приложение 23'
                        },
                        {
                            'v': '9351653a-8a3b-48a6-bb2f-32cc5adc3b20',
                            'r': 'PR-OPHS-244'
                        },
                        {
                            'v': 'af7e2a38-697e-4d7b-a70e-686fbf07bef0',
                            'r': 'Magna Architectural Design'
                        },
                        {
                            'v': 'e6f1da71-40ac-4084-847c-9555eedd62ee',
                            'r': 'Specialty Restaurant Group'
                        },
                        '8',
                        {
                            'v': '3ddfdd71-79d8-496f-99ef-eb598b984f86',
                            'r': 'Отделочные работы'
                        },
                        '6509.22',
                        '6509.22',
                        '52 дн.'
                    ],
                    [
                        '65fc8fc4-5686-46c6-8796-3558260395ce',
                        '2024-04-19 05:50:02',
                        {
                            'v': 'c43ac144-0645-49ea-ba37-b18273e75056',
                            'r': 'Приложение 23'
                        },
                        {
                            'v': '9351653a-8a3b-48a6-bb2f-32cc5adc3b20',
                            'r': 'PR-OPHS-244'
                        },
                        {
                            'v': 'af7e2a38-697e-4d7b-a70e-686fbf07bef0',
                            'r': 'Magna Architectural Design'
                        },
                        {
                            'v': 'e6f1da71-40ac-4084-847c-9555eedd62ee',
                            'r': 'Specialty Restaurant Group'
                        },
                        '8',
                        {
                            'v': '3ddfdd71-79d8-496f-99ef-eb598b984f86',
                            'r': 'Отделочные работы'
                        },
                        '6509.22',
                        '6509.22',
                        '52 дн.'
                    ],
                    [
                        '65fc8fc4-5686-46c6-8796-3558260395ce',
                        '2024-04-19 05:50:02',
                        {
                            'v': 'c43ac144-0645-49ea-ba37-b18273e75056',
                            'r': 'Приложение 23'
                        },
                        {
                            'v': '9351653a-8a3b-48a6-bb2f-32cc5adc3b20',
                            'r': 'PR-OPHS-244'
                        },
                        {
                            'v': 'af7e2a38-697e-4d7b-a70e-686fbf07bef0',
                            'r': 'Magna Architectural Design'
                        },
                        {
                            'v': 'e6f1da71-40ac-4084-847c-9555eedd62ee',
                            'r': 'Specialty Restaurant Group'
                        },
                        '8',
                        {
                            'v': '3ddfdd71-79d8-496f-99ef-eb598b984f86',
                            'r': 'Отделочные работы'
                        },
                        '6509.22',
                        '6509.22',
                        '52 дн.'
                    ],
                    [
                        '65fc8fc4-5686-46c6-8796-3558260395ce',
                        '2024-04-19 05:50:02',
                        {
                            'v': 'c43ac144-0645-49ea-ba37-b18273e75056',
                            'r': 'Приложение 23'
                        },
                        {
                            'v': '9351653a-8a3b-48a6-bb2f-32cc5adc3b20',
                            'r': 'PR-OPHS-244'
                        },
                        {
                            'v': 'af7e2a38-697e-4d7b-a70e-686fbf07bef0',
                            'r': 'Magna Architectural Design'
                        },
                        {
                            'v': 'e6f1da71-40ac-4084-847c-9555eedd62ee',
                            'r': 'Specialty Restaurant Group'
                        },
                        '8',
                        {
                            'v': '3ddfdd71-79d8-496f-99ef-eb598b984f86',
                            'r': 'Отделочные работы'
                        },
                        '6509.22',
                        '6509.22',
                        '52 дн.'
                    ],
                    [
                        '65fc8fc4-5686-46c6-8796-3558260395ce',
                        '2024-04-19 05:50:02',
                        {
                            'v': 'c43ac144-0645-49ea-ba37-b18273e75056',
                            'r': 'Приложение 23'
                        },
                        {
                            'v': '9351653a-8a3b-48a6-bb2f-32cc5adc3b20',
                            'r': 'PR-OPHS-244'
                        },
                        {
                            'v': 'af7e2a38-697e-4d7b-a70e-686fbf07bef0',
                            'r': 'Magna Architectural Design'
                        },
                        {
                            'v': 'e6f1da71-40ac-4084-847c-9555eedd62ee',
                            'r': 'Specialty Restaurant Group'
                        },
                        '8',
                        {
                            'v': '3ddfdd71-79d8-496f-99ef-eb598b984f86',
                            'r': 'Отделочные работы'
                        },
                        '6509.22',
                        '6509.22',
                        '52 дн.'
                    ],
                    [
                        '65fc8fc4-5686-46c6-8796-3558260395ce',
                        '2024-04-19 05:50:02',
                        {
                            'v': 'c43ac144-0645-49ea-ba37-b18273e75056',
                            'r': 'Приложение 23'
                        },
                        {
                            'v': '9351653a-8a3b-48a6-bb2f-32cc5adc3b20',
                            'r': 'PR-OPHS-244'
                        },
                        {
                            'v': 'af7e2a38-697e-4d7b-a70e-686fbf07bef0',
                            'r': 'Magna Architectural Design'
                        },
                        {
                            'v': 'e6f1da71-40ac-4084-847c-9555eedd62ee',
                            'r': 'Specialty Restaurant Group'
                        },
                        '8',
                        {
                            'v': '3ddfdd71-79d8-496f-99ef-eb598b984f86',
                            'r': 'Отделочные работы'
                        },
                        '6509.22',
                        '6509.22',
                        '52 дн.'
                    ],
                    [
                        '65fc8fc4-5686-46c6-8796-3558260395ce',
                        '2024-04-19 05:50:02',
                        {
                            'v': 'c43ac144-0645-49ea-ba37-b18273e75056',
                            'r': 'Приложение 23'
                        },
                        {
                            'v': '9351653a-8a3b-48a6-bb2f-32cc5adc3b20',
                            'r': 'PR-OPHS-244'
                        },
                        {
                            'v': 'af7e2a38-697e-4d7b-a70e-686fbf07bef0',
                            'r': 'Magna Architectural Design'
                        },
                        {
                            'v': 'e6f1da71-40ac-4084-847c-9555eedd62ee',
                            'r': 'Specialty Restaurant Group'
                        },
                        '8',
                        {
                            'v': '3ddfdd71-79d8-496f-99ef-eb598b984f86',
                            'r': 'Отделочные работы'
                        },
                        '6509.22',
                        '6509.22',
                        '52 дн.'
                    ],
                    [
                        '65fc8fc4-5686-46c6-8796-3558260395ce',
                        '2024-04-20 05:50:02',
                        {
                            'v': 'c43ac144-0645-49ea-ba37-b18273e75056',
                            'r': 'Приложение 2'
                        },
                        {
                            'v': '9351653a-8a3b-48a6-bb2f-32cc5adc3b20',
                            'r': 'PR-TMS-3-125'
                        },
                        {
                            'v': 'af7e2a38-697e-4d7b-a70e-686fbf07bef0',
                            'r': 'Cut Rite Lawn Care'
                        },
                        {
                            'v': 'e6f1da71-40ac-4084-847c-9555eedd62ee',
                            'r': 'Murray\'s Discount Auto Stores'
                        },
                        '2',
                        {
                            'v': '3ddfdd71-79d8-496f-99ef-eb598b984f86',
                            'r': 'Монолитные работы'
                        },
                        '9537.45',
                        '9537.45',
                        '73 дн.'
                    ],
                    [
                        '65fc8fc4-5686-46c6-8796-3558260395ce',
                        '2024-04-20 05:50:02',
                        {
                            'v': 'c43ac144-0645-49ea-ba37-b18273e75056',
                            'r': 'Приложение 2'
                        },
                        {
                            'v': '9351653a-8a3b-48a6-bb2f-32cc5adc3b20',
                            'r': 'PR-TMS-3-125'
                        },
                        {
                            'v': 'af7e2a38-697e-4d7b-a70e-686fbf07bef0',
                            'r': 'Cut Rite Lawn Care'
                        },
                        {
                            'v': 'e6f1da71-40ac-4084-847c-9555eedd62ee',
                            'r': 'Murray\'s Discount Auto Stores'
                        },
                        '2',
                        {
                            'v': '3ddfdd71-79d8-496f-99ef-eb598b984f86',
                            'r': 'Монолитные работы'
                        },
                        '9537.45',
                        '9537.45',
                        '73 дн.'
                    ],
                    [
                        '65fc8fc4-5686-46c6-8796-3558260395ce',
                        '2024-04-20 05:50:02',
                        {
                            'v': 'c43ac144-0645-49ea-ba37-b18273e75056',
                            'r': 'Приложение 2'
                        },
                        {
                            'v': '9351653a-8a3b-48a6-bb2f-32cc5adc3b20',
                            'r': 'PR-TMS-3-125'
                        },
                        {
                            'v': 'af7e2a38-697e-4d7b-a70e-686fbf07bef0',
                            'r': 'Cut Rite Lawn Care'
                        },
                        {
                            'v': 'e6f1da71-40ac-4084-847c-9555eedd62ee',
                            'r': 'Murray\'s Discount Auto Stores'
                        },
                        '2',
                        {
                            'v': '3ddfdd71-79d8-496f-99ef-eb598b984f86',
                            'r': 'Монолитные работы'
                        },
                        '9537.45',
                        '9537.45',
                        '73 дн.'
                    ],
                    [
                        '65fc8fc4-5686-46c6-8796-3558260395ce',
                        '2024-04-20 05:50:02',
                        {
                            'v': 'c43ac144-0645-49ea-ba37-b18273e75056',
                            'r': 'Приложение 2'
                        },
                        {
                            'v': '9351653a-8a3b-48a6-bb2f-32cc5adc3b20',
                            'r': 'PR-TMS-3-125'
                        },
                        {
                            'v': 'af7e2a38-697e-4d7b-a70e-686fbf07bef0',
                            'r': 'Cut Rite Lawn Care'
                        },
                        {
                            'v': 'e6f1da71-40ac-4084-847c-9555eedd62ee',
                            'r': 'Murray\'s Discount Auto Stores'
                        },
                        '2',
                        {
                            'v': '3ddfdd71-79d8-496f-99ef-eb598b984f86',
                            'r': 'Монолитные работы'
                        },
                        '9537.45',
                        '9537.45',
                        '73 дн.'
                    ],
                    [
                        '65fc8fc4-5686-46c6-8796-3558260395ce',
                        '2024-04-20 05:50:02',
                        {
                            'v': 'c43ac144-0645-49ea-ba37-b18273e75056',
                            'r': 'Приложение 2'
                        },
                        {
                            'v': '9351653a-8a3b-48a6-bb2f-32cc5adc3b20',
                            'r': 'PR-TMS-3-125'
                        },
                        {
                            'v': 'af7e2a38-697e-4d7b-a70e-686fbf07bef0',
                            'r': 'Cut Rite Lawn Care'
                        },
                        {
                            'v': 'e6f1da71-40ac-4084-847c-9555eedd62ee',
                            'r': 'Murray\'s Discount Auto Stores'
                        },
                        '2',
                        {
                            'v': '3ddfdd71-79d8-496f-99ef-eb598b984f86',
                            'r': 'Монолитные работы'
                        },
                        '9537.45',
                        '9537.45',
                        '73 дн.'
                    ],
                    [
                        '65fc8fc4-5686-46c6-8796-3558260395ce',
                        '2024-04-20 05:50:02',
                        {
                            'v': 'c43ac144-0645-49ea-ba37-b18273e75056',
                            'r': 'Приложение 2'
                        },
                        {
                            'v': '9351653a-8a3b-48a6-bb2f-32cc5adc3b20',
                            'r': 'PR-TMS-3-125'
                        },
                        {
                            'v': 'af7e2a38-697e-4d7b-a70e-686fbf07bef0',
                            'r': 'Cut Rite Lawn Care'
                        },
                        {
                            'v': 'e6f1da71-40ac-4084-847c-9555eedd62ee',
                            'r': 'Murray\'s Discount Auto Stores'
                        },
                        '2',
                        {
                            'v': '3ddfdd71-79d8-496f-99ef-eb598b984f86',
                            'r': 'Монолитные работы'
                        },
                        '9537.45',
                        '9537.45',
                        '73 дн.'
                    ],
                    [
                        '65fc8fc4-5686-46c6-8796-3558260395ce',
                        '2024-04-20 05:50:02',
                        {
                            'v': 'c43ac144-0645-49ea-ba37-b18273e75056',
                            'r': 'Приложение 2'
                        },
                        {
                            'v': '9351653a-8a3b-48a6-bb2f-32cc5adc3b20',
                            'r': 'PR-TMS-3-125'
                        },
                        {
                            'v': 'af7e2a38-697e-4d7b-a70e-686fbf07bef0',
                            'r': 'Cut Rite Lawn Care'
                        },
                        {
                            'v': 'e6f1da71-40ac-4084-847c-9555eedd62ee',
                            'r': 'Murray\'s Discount Auto Stores'
                        },
                        '2',
                        {
                            'v': '3ddfdd71-79d8-496f-99ef-eb598b984f86',
                            'r': 'Монолитные работы'
                        },
                        '9537.45',
                        '9537.45',
                        '73 дн.'
                    ],
                    [
                        '65fc8fc4-5686-46c6-8796-3558260395ce',
                        '2024-04-21 05:50:02',
                        {
                            'v': 'c43ac144-0645-49ea-ba37-b18273e75056',
                            'r': 'Приложение 3'
                        },
                        {
                            'v': '9351653a-8a3b-48a6-bb2f-32cc5adc3b20',
                            'r': 'PR-TMS-3-125'
                        },
                        {
                            'v': 'af7e2a38-697e-4d7b-a70e-686fbf07bef0',
                            'r': 'Bugle Boy'
                        },
                        {
                            'v': 'e6f1da71-40ac-4084-847c-9555eedd62ee',
                            'r': 'Cut Rite Lawn Care'
                        },
                        '9',
                        {
                            'v': '3ddfdd71-79d8-496f-99ef-eb598b984f86',
                            'r': 'Монолитные работы'
                        },
                        '3205.44',
                        '3205.44',
                        '148 дн.'
                    ],
                    [
                        '65fc8fc4-5686-46c6-8796-3558260395ce',
                        '2024-04-21 05:50:02',
                        {
                            'v': 'c43ac144-0645-49ea-ba37-b18273e75056',
                            'r': 'Приложение 3'
                        },
                        {
                            'v': '9351653a-8a3b-48a6-bb2f-32cc5adc3b20',
                            'r': 'PR-TMS-3-125'
                        },
                        {
                            'v': 'af7e2a38-697e-4d7b-a70e-686fbf07bef0',
                            'r': 'Bugle Boy'
                        },
                        {
                            'v': 'e6f1da71-40ac-4084-847c-9555eedd62ee',
                            'r': 'Cut Rite Lawn Care'
                        },
                        '9',
                        {
                            'v': '3ddfdd71-79d8-496f-99ef-eb598b984f86',
                            'r': 'Монолитные работы'
                        },
                        '3205.44',
                        '3205.44',
                        '148 дн.'
                    ],
                    [
                        '65fc8fc4-5686-46c6-8796-3558260395ce',
                        '2024-04-21 05:50:02',
                        {
                            'v': 'c43ac144-0645-49ea-ba37-b18273e75056',
                            'r': 'Приложение 3'
                        },
                        {
                            'v': '9351653a-8a3b-48a6-bb2f-32cc5adc3b20',
                            'r': 'PR-TMS-3-125'
                        },
                        {
                            'v': 'af7e2a38-697e-4d7b-a70e-686fbf07bef0',
                            'r': 'Bugle Boy'
                        },
                        {
                            'v': 'e6f1da71-40ac-4084-847c-9555eedd62ee',
                            'r': 'Cut Rite Lawn Care'
                        },
                        '9',
                        {
                            'v': '3ddfdd71-79d8-496f-99ef-eb598b984f86',
                            'r': 'Монолитные работы'
                        },
                        '3205.44',
                        '3205.44',
                        '148 дн.'
                    ],
                    [
                        '65fc8fc4-5686-46c6-8796-3558260395ce',
                        '2024-04-21 05:50:02',
                        {
                            'v': 'c43ac144-0645-49ea-ba37-b18273e75056',
                            'r': 'Приложение 3'
                        },
                        {
                            'v': '9351653a-8a3b-48a6-bb2f-32cc5adc3b20',
                            'r': 'PR-TMS-3-125'
                        },
                        {
                            'v': 'af7e2a38-697e-4d7b-a70e-686fbf07bef0',
                            'r': 'Bugle Boy'
                        },
                        {
                            'v': 'e6f1da71-40ac-4084-847c-9555eedd62ee',
                            'r': 'Cut Rite Lawn Care'
                        },
                        '9',
                        {
                            'v': '3ddfdd71-79d8-496f-99ef-eb598b984f86',
                            'r': 'Монолитные работы'
                        },
                        '3205.44',
                        '3205.44',
                        '148 дн.'
                    ],
                    [
                        '65fc8fc4-5686-46c6-8796-3558260395ce',
                        '2024-04-21 05:50:02',
                        {
                            'v': 'c43ac144-0645-49ea-ba37-b18273e75056',
                            'r': 'Приложение 3'
                        },
                        {
                            'v': '9351653a-8a3b-48a6-bb2f-32cc5adc3b20',
                            'r': 'PR-TMS-3-125'
                        },
                        {
                            'v': 'af7e2a38-697e-4d7b-a70e-686fbf07bef0',
                            'r': 'Bugle Boy'
                        },
                        {
                            'v': 'e6f1da71-40ac-4084-847c-9555eedd62ee',
                            'r': 'Cut Rite Lawn Care'
                        },
                        '9',
                        {
                            'v': '3ddfdd71-79d8-496f-99ef-eb598b984f86',
                            'r': 'Монолитные работы'
                        },
                        '3205.44',
                        '3205.44',
                        '148 дн.'
                    ],
                    [
                        '65fc8fc4-5686-46c6-8796-3558260395ce',
                        '2024-04-21 05:50:02',
                        {
                            'v': 'c43ac144-0645-49ea-ba37-b18273e75056',
                            'r': 'Приложение 3'
                        },
                        {
                            'v': '9351653a-8a3b-48a6-bb2f-32cc5adc3b20',
                            'r': 'PR-TMS-3-125'
                        },
                        {
                            'v': 'af7e2a38-697e-4d7b-a70e-686fbf07bef0',
                            'r': 'Bugle Boy'
                        },
                        {
                            'v': 'e6f1da71-40ac-4084-847c-9555eedd62ee',
                            'r': 'Cut Rite Lawn Care'
                        },
                        '9',
                        {
                            'v': '3ddfdd71-79d8-496f-99ef-eb598b984f86',
                            'r': 'Монолитные работы'
                        },
                        '3205.44',
                        '3205.44',
                        '148 дн.'
                    ],
                    [
                        '65fc8fc4-5686-46c6-8796-3558260395ce',
                        '2024-04-21 05:50:02',
                        {
                            'v': 'c43ac144-0645-49ea-ba37-b18273e75056',
                            'r': 'Приложение 3'
                        },
                        {
                            'v': '9351653a-8a3b-48a6-bb2f-32cc5adc3b20',
                            'r': 'PR-TMS-3-125'
                        },
                        {
                            'v': 'af7e2a38-697e-4d7b-a70e-686fbf07bef0',
                            'r': 'Bugle Boy'
                        },
                        {
                            'v': 'e6f1da71-40ac-4084-847c-9555eedd62ee',
                            'r': 'Cut Rite Lawn Care'
                        },
                        '9',
                        {
                            'v': '3ddfdd71-79d8-496f-99ef-eb598b984f86',
                            'r': 'Монолитные работы'
                        },
                        '3205.44',
                        '3205.44',
                        '148 дн.'
                    ],
                ]
            }
    
            resolve(tableData);
        }, 250);
    });
}