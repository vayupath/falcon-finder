import { rest } from 'msw';

export const handlers = [
  rest.post('https://findfalcone.herokuapp.com/find', (req, res, ctx) => {
    return res(ctx.json({ planet_name: 'Pingasor', status: 'success' }));
  }),

  // rest.post('https://findfalcone.herokuapp.com/find', (req, res, ctx) =>
  //   res(ctx.status(500))
  // ),
  rest.post('https://findfalcone.herokuapp.com/token', (req, res, ctx) => {
    return res(ctx.json({ token: 'XelBZzNVinqLmwdnGNnQFDNPPkPiVWyI' }));
  }),
  rest.get('https://findfalcone.herokuapp.com/vehicles', (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Space pod', total_no: 2, max_distance: 200, speed: 2 },
        { name: 'Space rocket', total_no: 1, max_distance: 300, speed: 4 },
        { name: 'Space shuttle', total_no: 1, max_distance: 400, speed: 5 },
        { name: 'Space ship', total_no: 2, max_distance: 600, speed: 10 },
      ])
    );
  }),

  rest.get('https://findfalcone.herokuapp.com/planets', (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Donlon', distance: 100 },
        { name: 'Enchai', distance: 200 },
        { name: 'Jebing', distance: 300 },
        { name: 'Sapir', distance: 400 },
        { name: 'Lerbin', distance: 500 },
        { name: 'Pingasor', distance: 600 },
      ])
    );
  }),
];
