
const year_built = () => {
    const date = new Date().getFullYear()
    let year_built = []
    for (let i = date; i > 1899; i--) {
        year_built.push(i)
    }
    return year_built
}

export const SelectFieldOptions = {
    
    transaction: ['Rent', 'Sale'],
    rent_period: ['Daily', 'Monthly'],
    currency: ['AMD', 'USD', 'RUB'],
    district: ['Ajapnyak', 
                'Arabkir', 
                'Avan', 
                'Davtashen', 
                'Erebuni', 
                'Kanaker-Zeytun', 
                'Kentron', 
                'Malatia-Sebastia', 
                'Nork-Marash', 
                'Nor Nork', 
                'Nubarashen', 
                'Shengavit',
            ],
    home_type: ['Apartment', 'House', 'Townhome'],
    furnishing: ['Full', 'Only Kitchen', 'None'],
    number_of_rooms: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
    year_built: year_built(), 
}