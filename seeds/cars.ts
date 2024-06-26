import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('cars').del();

  // Inserts seed entries
  await knex('cars').insert([
    {
      plate: 'DBH-3491',
      name: 'Ford F150',
      image: 'https://res.cloudinary.com/dpif60wfq/image/upload/v1717424041/kkxlm74oszbvxn3fthcv.jpg',
      rent_cost: 200000,
      capacity: 2,
      description: ' Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.',
      transmission: 'Automatic',
      type: 'Sedan',
      year: 2022,
      available_at: new Date('2022-03-23T15:49:05.563Z'),
      is_available: true,
    },
    {
      plate: 'WXB-3984',
      name: 'BMW X5',
      image: 'https://res.cloudinary.com/dpif60wfq/image/upload/v1717424042/zvtrast8nmig4lhvajoy.jpg',
      rent_cost: 800000,
      capacity: 6,
      description: ' Rear passenger map pockets. Electrochromic rearview mirror. Dual chrome exhaust tips. Locking glove box.',
      transmission: 'Automatic',
      type: 'Convertible',
      year: 2019,
      available_at: new Date('2022-03-23T15:49:05.563Z'),
      is_available: false,
    },
    {
      plate: 'OSL-4224',
      name: 'Lincoln MKZ',
      image: 'https://res.cloudinary.com/dpif60wfq/image/upload/v1717424039/grklg1nwu0nv3xzj7nh9.jpg',
      rent_cost: 900000,
      capacity: 6,
      description: ' Driver & front passenger map pockets. Direct-type tire pressure monitor system. Cargo area lamp. Glove box lamp.',
      transmission: 'Automanual',
      type: 'Sedan',
      year: 2021,
      available_at: new Date('2022-03-23T15:49:05.563Z'),
      is_available: true,
    },
    {
      plate: 'VPT-9753',
      name: 'BMW M5',
      image: 'https://res.cloudinary.com/dpif60wfq/image/upload/v1717424038/sw7oovps8ej0p3dfrcde.jpg',
      rent_cost: 900000,
      capacity: 6,
      description: ' 6.1L SRT V8 \"Hemi\" engine.',
      transmission: 'Manual',
      type: 'Hatchback',
      year: 2018,
      available_at: new Date('2022-03-23T15:49:05.563Z'),
      is_available: true,
    },
    {
      plate: 'BHD-3923',
      name: 'Lincoln Navigator',
      image: 'https://res.cloudinary.com/dpif60wfq/image/upload/v1717424045/ybb585jlbm5s9xtjpjlt.jpg',
      rent_cost: 200000,
      capacity: 2,
      description: ' Body color sill extension. Torsion beam rear suspension w/stabilizer bar. Front & rear passenger folding assist grips.',
      transmission: 'Automatic',
      type: 'Minivan',
      year: 2020,
      available_at: new Date('2022-03-23T15:49:05.563Z'),
      is_available: false,
    },
    {
      plate: 'JPM-5482',
      name: 'Ford Fiesta',
      image: 'https://res.cloudinary.com/dpif60wfq/image/upload/v1717424038/sooiphvcdtzlrru0cksh.jpg',
      rent_cost: 900000,
      capacity: 4,
      description: ' Tilt steering column. Carpeted cargo area. Tip start system. Leather-wrapped shift knob.',
      transmission: 'Automanual',
      type: 'Hatchback',
      year: 2016,
      available_at: new Date('2022-03-23T15:49:05.563Z'),
      is_available: true,
    },
    {
      plate: 'BTW-1960',
      name: 'Honda Accord',
      image: 'https://res.cloudinary.com/dpif60wfq/image/upload/v1717424033/siahj01bxqsaufzeeiqq.jpg',
      rent_cost: 900000,
      capacity: 4,
      description: ' Silver finish interior door handles. 160-amp alternator. Tire pressure monitoring system (TPMS). Cloth covered headliner.',
      transmission: 'Automatic',
      type: 'Sedan',
      year: 2020,
      available_at: new Date('2022-03-23T15:49:05.563Z'),
      is_available: false,
    },
    {
      plate: 'YHD-4104',
      name: 'Lincoln Navigator',
      image: 'https://res.cloudinary.com/dpif60wfq/image/upload/v1717424037/ifkfimshmcfzpybs7xiw.jpg',
      rent_cost: 300000,
      capacity: 2,
      description: ' XM satellite radio receiver -inc: 90 day trial subscription. Dual front illuminated visor vanity mirrors.',
      transmission: 'Manual',
      type: 'Regular Cab Pickup',
      year: 2014,
      available_at: new Date('2022-03-23T15:49:05.563Z'),
      is_available: true,
    },
    {
      plate: 'STL-7347',
      name: 'Buick LaCrosse',
      image: 'https://res.cloudinary.com/dpif60wfq/image/upload/v1717424035/kxgc6h3mnow3r9qdj7cl.jpg',
      rent_cost: 1000000,
      capacity: 6,
      description: ' Rear reading & courtesy lamps. Zone body construction -inc: front/rear crumple zones, hood deformation point.',
      transmission: 'Automatic',
      type: 'Extended Cab Pickup',
      year: 2012,
      available_at: new Date('2022-03-23T15:49:05.563Z'),
      is_available: true,
    },
    {
      plate: 'TJW-7622',
      name: 'BMW X5',
      image: 'https://res.cloudinary.com/dpif60wfq/image/upload/v1717424033/aajjb8qbqubwesbkd6dx.jpg',
      rent_cost: 300000,
      capacity: 6,
      description: ' Cargo compartment lamp. Body color fascias w/bright insert. Front/rear stabilizer bars.',
      transmission: 'Manual',
      type: 'Hatchback',
      year: 2019,
      available_at: new Date('2022-03-23T15:49:05.563Z'),
      is_available: true,
    },
  ]);
};
