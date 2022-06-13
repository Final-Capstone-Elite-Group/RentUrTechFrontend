import { rest } from 'msw';

const handlers = [
  rest.get('http://localhost:3000/equipments', (req, res, ctx) => res(
    ctx.json({
      data: [
        {
          id: '14',
          type: 'equipment',
          attributes: {
            id: 14,
            title: 'Wireless Printer',
            description: "The Wireless Printer gives you all the essential features you need—easily print, scan and copy, and activate HP+: HP's smart printing system that comes with 6 months of free Instant Ink and a 2 year extended HP warranty.",
            review: 'https://www.youtube.com/watch?v=9Xk39LNg304',
            duration: 5,
            rent_fee: '821.0',
            dates_reserved: [],
            total_amount_payable: '22.0',
            created_at: '2022-06-08T19:42:08.103Z',
            updated_at: '2022-06-08T19:42:08.112Z',
            image: {
              url: 'http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBJUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2c533787f3499541cdd2bd6da005bace4749ddb7/wireless_printer.jpeg',
            },
          },
        },
        {
          id: '13',
          type: 'equipment',
          attributes: {
            id: 13,
            title: 'Turntable',
            description: 'Whether you’re just getting into records, rediscovering a record collection long since buried away or simply adding a turntable to complete your system, the AT-LP60X fully automatic belt-drive turntable is an excellent choice. This affordable, easy-to-use turntable plays both 33-1/3 and 45 RPM records and, with its built-in switchable phonon preamp, can be connected directly to your home stereo, powered speakers, computer and other components, whether they have a dedicated phonon input or not. An update of the popular AT-LP60, the ATLP60X features a redesigned tone arm base and head shell to improve tracking and reduce resonance. Noise is further reduced by the inclusion of an AC adapter that moves the AC/DC conVersion outside of the chassis where its impact on the signal chain is limited. Audio-Technical has been a leader in phonon cartridge design for more than 50 years, and that expertise shows in the AT-LP60X’s Dual Magnet cartridge with replaceable stylus. The cartridge is integrated into the head shell for assured performance and ease of setup. The turntable comes with a detachable RCA output cable (3. 5 mm male to dual RCA male), 45 RPM adapter, and a removable hinged dust cover. It is available in black (AT-LP60X-BK), brown/black (AT-LP60X-BW), gunmetal/black (AT-LP60X-GM), and red/black (AT-LP60X-RD).',
            review: 'https://www.youtube.com/watch?v=Yaj1Mhj8mo4',
            duration: 6,
            rent_fee: '832.0',
            dates_reserved: [],
            total_amount_payable: '26.0',
            created_at: '2022-06-08T19:42:08.067Z',
            updated_at: '2022-06-08T19:42:08.081Z',
            image: {
              url: 'http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBJQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ee3004a8fe9fce926a806f65e4a87b9aa25c45af/turntable.jpeg',
            },
          },
        }],
    }),
    ctx.status(200),
  )),

  rest.get('http://localhost:3000/reservations', (req, res, ctx) => res(
    ctx.json({
      data: [
        {
          id: '15',
          type: 'reservation',
          attributes: {
            id: 15,
            total: '52.0',
            reserved_date: '2022-07-26',
            city: 'Somewhere nice',
            created_at: '2022-06-09T15:07:15.493Z',
            updated_at: '2022-06-09T15:07:15.493Z',
            equipment: {
              id: 4,
              title: 'GPS Drone',
              url: 'http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBGdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--9d122d8fb7af2f04562aa6a26d728ed7d3fe8c64/drone1.jpg',
              duration: 5,
            },
          },
        }],
    }),
    ctx.status(200),
  )),

  rest.post('http://localhost:3000/reservations', (req, res, ctx) => res(
    ctx.json(
      {
        id: 12,
        total: '52.0',
        reserved_date: '2022-06-09T00:00:00.000Z',
        city: 'Somewhere nice',
        equipment_id: 4,
        user_id: 25,
        created_at: '2022-06-09T15:02:25.381Z',
        updated_at: '2022-06-09T15:02:25.381Z',
      },
    ),
    ctx.status(200),
  )),

  rest.delete('http://localhost:3000/reservations/15', (req, res, ctx) => res(
    ctx.json(
      {
        data: 'Reservation destroyed successfully',
      },
    ),
    ctx.status(200),
  )),
];

export default handlers;
