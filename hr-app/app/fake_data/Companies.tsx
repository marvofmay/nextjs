import Company from '../types/Company';

const companies: Company[] = [
    {
        uuid: '1',
        companyUUID: null,
        fullName: 'Tech Innovators Inc.',
        shortName: 'TechInno',
        description: null,
        nip: '1234567890',
        regon: '0987654321',
        industry: {
            uuid: '1',
            name: 'Technology'
        },
        //logo: null,
        active: true,
        address: {
            country: 'U.S.A.',
            city: 'New York',
            postcode: '12-123',
            street: 'wwewe'
        },
        createdAt: '2024-10-27T12:00:00',
        updatedAt: '2024-10-27T12:00:00',
        deletedAt: null,
    },
    {
        uuid: '2',
        companyUUID: null,
        fullName: 'Green Solutions Ltd.',
        shortName: 'GreenSol',
        description: null,
        nip: '2345678901',
        regon: '1234567890',
        industry: {
            uuid: '1',
            name: 'Technology'
        },
        //logo: null,
        active: true,
        address: {
            country: 'U.S.A.',
            city: 'New York',
            postcode: '12-123',
            street: 'wwewe'
        },
        createdAt: '2024-10-27T12:10:00',
        updatedAt: '2024-10-27T12:10:00',
        deletedAt: null,
    },
];

export default companies;