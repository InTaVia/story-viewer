export interface Node {
    entity: Entity;
    x: number;
    y: number;
    isPrimary: boolean;
  }
  
  export interface Link {
    source: Node;
    target: Node;
    roles: Array<Event>;
  }
  
  export const duererNodes = [
    {
      entity: {
        id: "data-duerer-macro-pr-001",
      },
      x: 0,
      y: 0,
      isPrimary: true,
    },
    {
      entity: {
        id: "data-duerer-macro-pl-001",
        label: {
          default: "Nürnberg",
        },
        alternativeLabels: [
          {
            default: "Nuremberg",
          },
        ],
        linkedIds: [
          {
            id: "2861650",
            provider: {
              label: "Geonames",
              baseUrl: "https://www.geonames.org/2861650",
            },
          },
        ],
        relations: [
          {
            event: "data-duerer-macro-macro-ev-001",
            role: "role-took_place_at",
          },
          {
            event: "data-duerer-macro-macro-ev-002",
            role: "role-took_place_at",
          },
          {
            event: "data-duerer-macro-macro-ev-005",
            role: "role-took_place_at",
          },
          {
            event: "data-duerer-macro-macro-ev-010",
            role: "role-took_place_at",
          },
          {
            event: "data-duerer-macro-macro-ev-011",
            role: "role-took_place_at",
          },
          {
            event: "data-duerer-macro-macro-ev-012",
            role: "role-took_place_at",
          },
          {
            event: "data-duerer-macro-macro-ev-013",
            role: "role-took_place_at",
          },
          {
            event: "data-duerer-macro-macro-ev-016",
            role: "role-took_place_at",
          },
          {
            event: "data-duerer-macro-macro-ev-017",
            role: "role-took_place_at",
          },
          {
            event: "data-duerer-macro-macro-ev-018",
            role: "role-took_place_at",
          },
          {
            event: "data-duerer-macro-macro-ev-019",
            role: "role-took_place_at",
          },
          {
            event: "data-duerer-macro-macro-ev-020",
            role: "role-took_place_at",
          },
          {
            event: "data-duerer-macro-macro-ev-022",
            role: "role-took_place_at",
          },
          {
            event: "data-duerer-macro-macro-ev-023",
            role: "role-took_place_at",
          },
          {
            event: "data-duerer-macro-macro-ev-038",
            role: "role-took_place_at",
          },
          {
            event: "data-duerer-macro-macro-ev-039",
            role: "role-took_place_at",
          },
          {
            event: "data-duerer-macro-macro-ev-040",
            role: "role-took_place_at",
          },
        ],
        kind: "place",
        type: {
          id: "place-type-city",
          label: {
            default: "city",
          },
        },
        geometry: {
          type: "Point",
          coordinates: [11.07752, 49.45421],
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-pr-002",
        label: {
          default: "Anton Koberger",
        },
        linkedIds: [
          {
            id: "118563890",
            provider: {
              label: "GND",
              baseUrl: "https://d-nb.info/gnd/118563890",
            },
          },
        ],
        relations: [
          {
            event: "data-duerer-macro-macro-ev-001",
            role: "role-was_godfather",
          },
        ],
        kind: "person",
        gender: {
          id: "male",
          label: {
            default: "male",
          },
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-pr-003",
        label: {
          default: "Michael Wolgemut",
        },
        linkedIds: [
          {
            id: "118771175",
            provider: {
              label: "GND",
              baseUrl: "https://d-nb.info/gnd/118771175",
            },
          },
        ],
        relations: [
          {
            event: "data-duerer-macro-macro-ev-002",
            role: "role-was_teacher",
          },
        ],
        kind: "person",
        gender: {
          id: "male",
          label: {
            default: "male",
          },
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-pl-002",
        label: {
          default: "Oberrhein",
        },
        relations: [
          {
            event: "data-duerer-macro-macro-ev-003",
            role: "role-took_place_at",
          },
        ],
        kind: "place",
        type: {
          id: "place-type-city",
          label: {
            default: "city",
          },
        },
        geometry: {
          type: "Point",
          coordinates: [8.34915, 49.69025],
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-pr-004",
        label: {
          default: "Martin Schongauer",
        },
        linkedIds: [
          {
            id: "118610430",
            provider: {
              label: "GND",
              baseUrl: "https://d-nb.info/gnd/118610430",
            },
          },
        ],
        relations: [
          {
            event: "data-duerer-macro-macro-ev-004",
            role: "role-was_employer",
          },
        ],
        kind: "person",
        gender: {
          id: "male",
          label: {
            default: "male",
          },
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-pl-003",
        label: {
          default: "Colmar",
        },
        relations: [
          {
            event: "data-duerer-macro-macro-ev-004",
            role: "role-took_place_at",
          },
        ],
        kind: "place",
        type: {
          id: "place-type-city",
          label: {
            default: "city",
          },
        },
        geometry: {
          type: "Point",
          coordinates: [7.377460585, 48.16863472],
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-pr-005",
        label: {
          default: "Agnes Dürer",
        },
        alternativeLabels: [
          {
            default: "Agnes Frey",
          },
        ],
        linkedIds: [
          {
            id: "118869051",
            provider: {
              label: "GND",
              baseUrl: "https://d-nb.info/gnd/118869051",
            },
          },
        ],
        media: ["data-duerer-macro-m-005"],
        relations: [
          {
            event: "data-duerer-macro-macro-ev-005",
            role: "role-was_wife",
          },
        ],
        kind: "person",
        gender: {
          id: "female",
          label: {
            default: "female",
          },
        },
        biographies: ["data-duerer-macro-bio-002"],
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-pl-004",
        label: {
          default: "Tirol",
        },
        relations: [
          {
            event: "data-duerer-macro-macro-ev-006",
            role: "role-took_place_at",
          },
        ],
        kind: "place",
        type: {
          id: "place-type-state",
          label: {
            default: "state",
          },
        },
        geometry: {
          type: "Point",
          coordinates: [11.15441, 46.690182],
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-pl-005",
        label: {
          default: "Südtirol",
        },
        relations: [
          {
            event: "data-duerer-macro-macro-ev-007",
            role: "role-took_place_at",
          },
        ],
        kind: "place",
        type: {
          id: "place-type-state",
          label: {
            default: "state",
          },
        },
        geometry: {
          type: "Point",
          coordinates: [11.43126, 46.382648],
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-pl-006",
        label: {
          default: "Trentino",
        },
        relations: [
          {
            event: "data-duerer-macro-macro-ev-008",
            role: "role-took_place_at",
          },
        ],
        kind: "place",
        type: {
          id: "place-type-state",
          label: {
            default: "state",
          },
        },
        geometry: {
          type: "Point",
          coordinates: [11.14166686, 46.10114108],
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-pl-007",
        label: {
          default: "Venedig",
        },
        relations: [
          {
            event: "data-duerer-macro-macro-ev-009",
            role: "role-took_place_at",
          },
          {
            event: "data-duerer-macro-macro-ev-014",
            role: "role-took_place_at",
          },
        ],
        kind: "place",
        type: {
          id: "place-type-city",
          label: {
            default: "city",
          },
        },
        geometry: {
          type: "Point",
          coordinates: [12.33878, 45.434341],
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-gr-001",
        label: {
          default: "Maler- und Graphikwerkstatt",
        },
        description: "Dürer baut Maler- und Graphikwerkstatt in Nürnberg auf",
        source: {
          citation: "Arbeitsverträge, frühe Kopien der Druckgraphiken vor 1500",
        },
        relations: [
          {
            event: "data-duerer-macro-macro-ev-010",
            role: "role-was_founded",
          },
        ],
        kind: "group",
        type: {
          id: "group-type-workspace",
          label: {
            default: "workspace",
          },
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-ob-001",
        label: {
          default: "Apokalypse",
        },
        description: "Mit der „Apokalypse“ erscheint Dürers erstes großes Buch",
        source: {
          citation: "Kolophon",
        },
        relations: [
          {
            event: "data-duerer-macro-macro-ev-011",
            role: "role-object_created",
          },
        ],
        kind: "cultural-heritage-object",
        type: {
          id: "cultural-heritage-object-type-book",
          label: {
            default: "book",
          },
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-ob-002",
        label: {
          default: "Selbstbildnis im Pelzrock",
        },
        media: ["data-duerer-macro-m-006"],
        relations: [
          {
            event: "data-duerer-macro-macro-ev-012",
            role: "role-object_created",
          },
        ],
        kind: "cultural-heritage-object",
        type: {
          id: "cultural-heritage-object-type-drawing",
          label: {
            default: "drawing",
          },
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-gr-002",
        label: {
          default: "München, Alte Pinakothek",
        },
        relations: [
          {
            event: "data-duerer-macro-macro-ev-012",
            role: "role-current_location",
          },
        ],
        kind: "group",
        type: {
          id: "group-type-museum",
          label: {
            default: "museum",
          },
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-ob-003",
        label: {
          default: "Der Hase",
        },
        description:
          'The "Young Hare", dated 1502, counts among Dürer\'s most famous works. The highly detailed drawing of the animal still fascinates today.',
        media: ["data-duerer-macro-m-034"],
        relations: [
          {
            event: "data-duerer-macro-macro-ev-013",
            role: "role-object_created",
          },
        ],
        kind: "cultural-heritage-object",
        type: {
          id: "cultural-heritage-object-type-drawing",
          label: {
            default: "drawing",
          },
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-pl-008",
        label: {
          default: "Bologna",
        },
        relations: [
          {
            event: "data-duerer-macro-macro-ev-015",
            role: "role-took_place_at",
          },
        ],
        kind: "place",
        type: {
          id: "place-type-city",
          label: {
            default: "city",
          },
        },
        geometry: {
          type: "Point",
          coordinates: [11.34163535, 44.49392625],
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-ob-007",
        label: {
          default: "Dürer-Haus",
        },
        media: ["data-duerer-macro-m-038"],
        relations: [
          {
            event: "data-duerer-macro-macro-ev-017",
            role: "role-object_bought",
          },
        ],
        kind: "cultural-heritage-object",
        type: {
          id: "cultural-heritage-object-type-building",
          label: {
            default: "building",
          },
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-ob-004",
        label: {
          default: "Ritter, Tod und Teufel",
        },
        description: "Drei Meisterstiche",
        media: ["data-duerer-macro-m-035"],
        relations: [
          {
            event: "data-duerer-macro-macro-ev-018",
            role: "role-object_created",
          },
        ],
        kind: "cultural-heritage-object",
        type: {
          id: "cultural-heritage-object-type-engraving",
          label: {
            default: "engraving",
          },
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-ob-005",
        label: {
          default: "Hieronymus im Gehäus",
        },
        description: "Drei Meisterstiche",
        media: ["data-duerer-macro-m-036"],
        relations: [
          {
            event: "data-duerer-macro-macro-ev-019",
            role: "role-object_created",
          },
        ],
        kind: "cultural-heritage-object",
        type: {
          id: "cultural-heritage-object-type-engraving",
          label: {
            default: "engraving",
          },
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-ob-006",
        label: {
          default: "Melancholie",
        },
        description:
          'Drei Meisterstiche, Dürer\'s "Melancholia" (1514) is his best known master engraving. The winged female figure of melancholy, deep in her thoughts, is surrounded by meticulously rendered objects related to geometry, astrology and mathematics. The scribbling putto adds a playful note to this enigmatic scene which culminates in the cry of the beat-like creature. ',
        media: ["data-duerer-macro-m-037"],
        relations: [
          {
            event: "data-duerer-macro-macro-ev-020",
            role: "role-object_created",
          },
        ],
        kind: "cultural-heritage-object",
        type: {
          id: "cultural-heritage-object-type-engraving",
          label: {
            default: "engraving",
          },
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-ob-009",
        label: {
          default: "Portrait von Kaiser Maximilian",
        },
        relations: [
          {
            event: "data-duerer-macro-macro-ev-021",
            role: "role-object_created",
          },
        ],
        kind: "cultural-heritage-object",
        type: {
          id: "cultural-heritage-object-type-drawing",
          label: {
            default: "drawing",
          },
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-pl-009",
        label: {
          default: "Augsburg",
        },
        relations: [
          {
            event: "data-duerer-macro-macro-ev-021",
            role: "role-took_place_at",
          },
        ],
        kind: "place",
        type: {
          id: "place-type-city",
          label: {
            default: "city",
          },
        },
        geometry: {
          type: "Point",
          coordinates: [10.98959125, 48.41017875],
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-ob-010",
        label: {
          default: "Ehrenpforte für Kaiser Maximilian I. (Riesenholzschnitt)",
        },
        relations: [
          {
            event: "data-duerer-macro-macro-ev-022",
            role: "role-object_created",
          },
        ],
        kind: "cultural-heritage-object",
        type: {
          id: "cultural-heritage-object-type-woodcut",
          label: {
            default: "woodcut",
          },
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-pl-010",
        label: {
          default: "Köln",
        },
        alternativeLabels: [
          {
            default: "Cologne",
          },
        ],
        relations: [
          {
            event: "data-duerer-macro-macro-ev-024",
            role: "role-took_place_at",
          },
          {
            event: "data-duerer-macro-macro-ev-030",
            role: "role-took_place_at",
          },
        ],
        kind: "place",
        type: {
          id: "place-type-city",
          label: {
            default: "city",
          },
        },
        geometry: {
          type: "Point",
          coordinates: [6.951517268, 50.97340752],
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-he-001",
        label: {
          default: "Krönung Karl V",
        },
        relations: [
          {
            event: "data-duerer-macro-macro-ev-025",
            role: "role-is_historical_event",
          },
        ],
        kind: "historical-event",
        type: {
          id: "historical-event-type-coronation",
          label: {
            default: "coronation",
          },
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-pl-011",
        label: {
          default: "Aachen",
        },
        relations: [
          {
            event: "data-duerer-macro-macro-ev-025",
            role: "role-took_place_at",
          },
        ],
        kind: "place",
        type: {
          id: "place-type-city",
          label: {
            default: "city",
          },
        },
        geometry: {
          type: "Point",
          coordinates: [6.258080332, 50.77997052],
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-pr-007",
        label: {
          default: "Karl V",
        },
        alternativeLabels: [
          {
            default: "Charles V.",
          },
        ],
        linkedIds: [
          {
            id: "118560093",
            provider: {
              label: "GND",
              baseUrl: "https://d-nb.info/gnd/118560093",
            },
          },
        ],
        relations: [
          {
            event: "data-duerer-macro-macro-ev-025",
            role: "role-participated",
          },
          {
            event: "data-duerer-macro-macro-ev-030",
            role: "role-participated",
          },
        ],
        kind: "person",
        gender: {
          id: "male",
          label: {
            default: "male",
          },
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-pl-012",
        label: {
          default: "Antwerpen",
        },
        alternativeLabels: [
          {
            default: "Antwerp",
          },
        ],
        relations: [
          {
            event: "data-duerer-macro-macro-ev-026",
            role: "role-took_place_at",
          },
          {
            event: "data-duerer-macro-macro-ev-029",
            role: "role-took_place_at",
          },
          {
            event: "data-duerer-macro-macro-ev-031",
            role: "role-took_place_at",
          },
          {
            event: "data-duerer-macro-macro-ev-034",
            role: "role-took_place_at",
          },
          {
            event: "data-duerer-macro-macro-ev-036",
            role: "role-took_place_at",
          },
        ],
        kind: "place",
        type: {
          id: "place-type-city",
          label: {
            default: "city",
          },
        },
        geometry: {
          type: "Point",
          coordinates: [4.344625773, 51.30232385],
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-pr-006",
        label: {
          default: "Konrat Meit",
        },
        relations: [
          {
            event: "data-duerer-macro-macro-ev-027",
            role: "role-participated",
          },
        ],
        kind: "person",
        gender: {
          id: "male",
          label: {
            default: "male",
          },
        },
        occupations: ["occupation-bildhauer"],
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-pl-013",
        label: {
          default: "Mecheln",
        },
        alternativeLabels: [
          {
            default: "Mechelen",
          },
        ],
        relations: [
          {
            event: "data-duerer-macro-macro-ev-027",
            role: "role-took_place_at",
          },
          {
            event: "data-duerer-macro-macro-ev-035",
            role: "role-took_place_at",
          },
        ],
        kind: "place",
        type: {
          id: "place-type-city",
          label: {
            default: "city",
          },
        },
        geometry: {
          type: "Point",
          coordinates: [4.479117295, 51.02651151],
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-pl-014",
        label: {
          default: "Brüssel",
        },
        alternativeLabels: [
          {
            default: "Brussels",
          },
        ],
        relations: [
          {
            event: "data-duerer-macro-macro-ev-028",
            role: "role-took_place_at",
          },
          {
            event: "data-duerer-macro-macro-ev-037",
            role: "role-took_place_at",
          },
        ],
        kind: "place",
        type: {
          id: "place-type-city",
          label: {
            default: "city",
          },
        },
        geometry: {
          type: "Point",
          coordinates: [4.319246516, 50.95522847],
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-pl-015",
        label: {
          default: "Brügge",
        },
        alternativeLabels: [
          {
            default: "Bruges",
          },
        ],
        relations: [
          {
            event: "data-duerer-macro-macro-ev-032",
            role: "role-took_place_at",
          },
        ],
        kind: "place",
        type: {
          id: "place-type-city",
          label: {
            default: "city",
          },
        },
        geometry: {
          type: "Point",
          coordinates: [3.210779284, 51.28033424],
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-pl-016",
        label: {
          default: "Gent",
        },
        alternativeLabels: [
          {
            default: "Ghent",
          },
        ],
        relations: [
          {
            event: "data-duerer-macro-macro-ev-033",
            role: "role-took_place_at",
          },
        ],
        kind: "place",
        type: {
          id: "place-type-city",
          label: {
            default: "city",
          },
        },
        geometry: {
          type: "Point",
          coordinates: [3.765888767, 51.14322955],
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-pr-008",
        label: {
          default: "Margarete von Österreich",
        },
        relations: [
          {
            event: "data-duerer-macro-macro-ev-035",
            role: "role-participated",
          },
        ],
        kind: "person",
        gender: {
          id: "female",
          label: {
            default: "female",
          },
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-ob-011",
        label: {
          default: "Porträtauftrag des dänischen Königs Christian II. (1521)",
        },
        description:
          "Christian II of Denmark, who is married to Charles' V sister and stays at the court of Brussels, commissions Dürer to paint his portrait. The painting is lost, but a drawing gives an impression of Dürer's work.",
        media: ["data-duerer-macro-m-029"],
        relations: [
          {
            event: "data-duerer-macro-macro-ev-037",
            role: "role-object_created",
          },
        ],
        kind: "cultural-heritage-object",
        type: {
          id: "cultural-heritage-object-type-drawing",
          label: {
            default: "drawing",
          },
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-pr-012",
        label: {
          default: "Christian II, King of Denmark",
        },
        linkedIds: [
          {
            id: "119195380",
            provider: {
              label: "GND",
              baseUrl: "https://d-nb.info/gnd/119195380",
            },
          },
        ],
        media: ["data-duerer-macro-m-029"],
        relations: [
          {
            event: "data-duerer-macro-macro-ev-037",
            role: "role-comissioned_by",
          },
        ],
        kind: "person",
        gender: {
          id: "male",
          label: {
            default: "male",
          },
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-ob-008",
        label: {
          default:
            "Theoretische Schriften zur Perspektive, menschlichen Proportion und dem Festungsbau in deutscher Sprache",
        },
        description:
          'Between 1525 and 1528, Dürer edits his three theoretical treatises, the "Theory of Perspective" (1525), the "Treatise on Fortifications" (1527), and the "Book of Proportions" (1528), published postumously by his wife Agnes. Since the beginning of the 16th century, Dürer had worked on the texts and illustrations, trying to unravel the "secrets of perspective" and different methods to calculate human proportions. Dürer\'s original German versions were translated into Latin and other languages.',
        source: {
          citation: "Kolophone",
        },
        media: ["data-duerer-macro-m-043"],
        relations: [
          {
            event: "data-duerer-macro-macro-ev-039",
            role: "role-object_created",
          },
        ],
        kind: "cultural-heritage-object",
        type: {
          id: "cultural-heritage-object-type-manuscript",
          label: {
            default: "manuscript",
          },
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
    {
      entity: {
        id: "data-duerer-macro-gr-020",
        label: {
          default: "Johannisfriedhof",
        },
        media: ["data-duerer-macro-m-044"],
        relations: [
          {
            event: "data-duerer-macro-macro-ev-040",
            role: "role-is_gravesite",
          },
        ],
        kind: "group",
        type: {
          id: "group-type-cemitery",
          label: {
            default: "cemitery",
          },
        },
      },
      x: 0,
      y: 0,
      isPrimary: false,
    },
  ];
  
  export const duererLinks = [
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-pl-001",
          label: {
            default: "Nürnberg",
          },
          alternativeLabels: [
            {
              default: "Nuremberg",
            },
          ],
          linkedIds: [
            {
              id: "2861650",
              provider: {
                label: "Geonames",
                baseUrl: "https://www.geonames.org/2861650",
              },
            },
          ],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-took_place_at",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-took_place_at",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-took_place_at",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-took_place_at",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-took_place_at",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-took_place_at",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-took_place_at",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-took_place_at",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-took_place_at",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-took_place_at",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-took_place_at",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-took_place_at",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-took_place_at",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-took_place_at",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-took_place_at",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-took_place_at",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-took_place_at",
            },
          ],
          kind: "place",
          type: {
            id: "place-type-city",
            label: {
              default: "city",
            },
          },
          geometry: {
            type: "Point",
            coordinates: [11.07752, 49.45421],
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-001",
          label: {
            default: "Geburt von Albrecht Dürer",
          },
          description:
            "Dürer wird in Nürnberg geboren, sein Pate ist der international bekannte Drucker Anton Koberger, Taufdatum: 21.5.1471",
          kind: "event-kind-birth",
          source: {
            citation: "Dürers Familienchronik",
          },
          startDate: "1471-05-21",
          relations: [
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-person_born",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-002",
              role: "role-was_godfather",
            },
          ],
        },
        {
          id: "data-duerer-macro-macro-ev-002",
          label: {
            default: "Malerlehre bei Michael Wolgemut",
          },
          description: "Malerlehre bei Michael Wolgemut in Nürnberg",
          kind: "event-kind-education",
          source: {
            citation: "Dürers Familienchronik",
          },
          startDate: "1486-01-01",
          endDate: "1489-12-31",
          relations: [
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_student",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-003",
              role: "role-was_teacher",
            },
          ],
        },
        {
          id: "data-duerer-macro-macro-ev-005",
          label: {
            default: "Heirat mit Agnes Frey",
          },
          description: "Heirat mit Agnes Frey in Nürnberg",
          kind: "event-kind-family",
          startDate: "1494-04-01",
          relations: [
            {
              entity: "data-duerer-macro-pr-005",
              role: "role-was_wife",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_husband",
            },
          ],
        },
        {
          id: "data-duerer-macro-macro-ev-010",
          label: {
            default: "Aufbau einer Maler- und Graphikwerkstatt",
          },
          description:
            "Aufbau einer Maler- und Graphikwerkstatt in Nürnberg mit internationalem Vertriebsnetz, ab 1497 erste Angestellte",
          kind: "event-kind-founding",
          source: {
            citation: "Arbeitsverträge, frühe Kopien der Druckgraphiken vor 1500",
          },
          startDate: "1495-05-30",
          relations: [
            {
              entity: "data-duerer-macro-gr-001",
              role: "role-was_founded",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_founded_by",
            },
          ],
        },
        {
          id: "data-duerer-macro-macro-ev-011",
          label: {
            default: "Apokalypse erscheint",
          },
          description: "Mit der „Apokalypse“ erscheint Dürers erstes großes Buch",
          kind: "event-kind-creation",
          source: {
            citation: "Kolophon",
          },
          startDate: "1498-01-01",
          relations: [
            {
              entity: "data-duerer-macro-ob-001",
              role: "role-object_created",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_created_by",
            },
          ],
        },
        {
          id: "data-duerer-macro-macro-ev-012",
          label: {
            default: "Selbstbildnis im Pelzrock erstellt",
          },
          description: "Selbstbildnis im Pelzrock (München, Alte Pinakothek)",
          kind: "event-kind-creation",
          source: {
            citation: "Datierung auf Bild, Physiognomie",
          },
          startDate: "1500-01-01",
          relations: [
            {
              entity: "data-duerer-macro-ob-002",
              role: "role-object_created",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_created_by",
            },
            {
              entity: "data-duerer-macro-gr-002",
              role: "role-current_location",
            },
          ],
        },
        {
          id: "data-duerer-macro-macro-ev-013",
          label: {
            default: "„Der Hase“ erstellt",
          },
          description: "„Der Hase“ als erstes Tieraquarell",
          kind: "event-kind-creation",
          source: {
            citation: "Datierung auf Bild, ähnliche zeitnahe Studien",
          },
          startDate: "1502-01-01",
          relations: [
            {
              entity: "data-duerer-macro-ob-003",
              role: "role-object_created",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_created_by",
            },
          ],
        },
        {
          id: "data-duerer-macro-macro-ev-016",
          label: {
            default: "Zweite Italienreise: Rückkehr nach Nürnberg",
          },
          description: "Zweite Italienreise, Aufenthalte in Venedig und Bologna",
          kind: "event-kind-travel",
          source: {
            citation:
              "Briefe aus Venedig, Gemälde, Christoph Scheurl 1509 = diente ihm in Venedig und Bologna als Übersetzer",
          },
          startDate: "1507-02-28",
          relations: [
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_travelling",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
          ],
        },
        {
          id: "data-duerer-macro-macro-ev-017",
          label: {
            default: "Kauf des „Dürer-Hauses“",
          },
          description: "Kauf des „Dürer-Hauses“ am Tiergärtnertor in Nürnberg",
          kind: "event-kind-bussines",
          source: {
            citation: "Urkunde",
          },
          startDate: "1509-01-01",
          relations: [
            {
              entity: "data-duerer-macro-ob-007",
              role: "role-object_bought",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_bought_by",
            },
          ],
        },
        {
          id: "data-duerer-macro-macro-ev-018",
          label: {
            default: "Drei Meisterstiche: „Ritter, Tod und Teufel“",
          },
          description:
            "Drei Meisterstiche („Ritter, Tod und Teufel“, „Hieronymus im Gehäus“, „Melancholie“)",
          kind: "event-kind-creation",
          source: {
            citation: "Datierung auf Kupferstichen",
          },
          startDate: "1513-01-01",
          relations: [
            {
              entity: "data-duerer-macro-ob-004",
              role: "role-object_created",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_created_by",
            },
          ],
        },
        {
          id: "data-duerer-macro-macro-ev-019",
          label: {
            default: "Drei Meisterstiche: „Hieronymus im Gehäus“",
          },
          description:
            "Drei Meisterstiche („Ritter, Tod und Teufel“, „Hieronymus im Gehäus“, „Melancholie“)",
          kind: "event-kind-creation",
          source: {
            citation: "Datierung auf Kupferstichen",
          },
          startDate: "1513-01-01",
          relations: [
            {
              entity: "data-duerer-macro-ob-005",
              role: "role-object_created",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_created_by",
            },
          ],
        },
        {
          id: "data-duerer-macro-macro-ev-020",
          label: {
            default: "Drei Meisterstiche: „Melancholie“",
          },
          description:
            "Drei Meisterstiche („Ritter, Tod und Teufel“, „Hieronymus im Gehäus“, „Melancholie“)",
          kind: "event-kind-creation",
          source: {
            citation: "Datierung auf Kupferstichen",
          },
          startDate: "1513-01-01",
          relations: [
            {
              entity: "data-duerer-macro-ob-006",
              role: "role-object_created",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_created_by",
            },
          ],
        },
        {
          id: "data-duerer-macro-macro-ev-022",
          label: {
            default: "Ehrenpforte für Kaiser Maximilian I.",
          },
          description: "Ehrenpforte für Kaiser Maximilian I. (Riesenholzschnitt)",
          kind: "event-kind-creation",
          source: {
            citation: "Korrespondenz, Datierung auf Holzschnitt",
          },
          startDate: "1517-07-31",
          relations: [
            {
              entity: "data-duerer-macro-ob-010",
              role: "role-object_created",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_created_by",
            },
          ],
        },
        {
          id: "data-duerer-macro-macro-ev-023",
          label: {
            default: "Beginn der Niederländische Reise",
          },
          description:
            "Beginn der Niederländische Reise, Aufenthalte in Köln, Aachen, Antwerpen, Brüssel, Gent, Brügge, Mecheln, Dürer genießt internationalen Ruhm und verkehrt in Hofkreisen",
          kind: "event-kind-travel",
          source: {
            citation: "„Tagebuch“ der NL Reise, Werke",
          },
          startDate: "1520-07-01",
          relations: [
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_travelling",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
          ],
        },
        {
          id: "data-duerer-macro-macro-ev-038",
          label: {
            default: "Rückkehr nach Nürnberg",
          },
          description: "Rückkehr nach Nürnberg",
          kind: "event-kind-travel",
          startDate: "1521-07-12",
          relations: [
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_travelling",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
          ],
        },
        {
          id: "data-duerer-macro-macro-ev-039",
          label: {
            default:
              "Theoretische Schriften zur Perspektive, menschlichen Proportion und dem Festungsbau in deutscher Sprache",
          },
          description:
            "Theoretische Schriften zur Perspektive, menschlichen Proportion und dem Festungsbau in deutscher Sprache",
          kind: "event-kind-creation",
          source: {
            citation: "Kolophone",
          },
          startDate: "1525-01-01",
          endDate: "1528-04-05",
          relations: [
            {
              entity: "data-duerer-macro-ob-008",
              role: "role-object_created",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_created_by",
            },
          ],
        },
        {
          id: "data-duerer-macro-macro-ev-040",
          label: {
            default:
              "Dürer stirbt in Nürnberg und wird auf dem Johannisfriedhof begraben",
          },
          description:
            "Dürer stirbt in Nürnberg und wird auf dem Johannisfriedhof begraben; Dürer died on April 6, 1528 at the age of 56 in his house in Nuremberg after a short illness. He was buried in the family grave of his parents-in-law on St John's graveyard in Nuremberg. His wife Agnes continued to run the workshop until her own death in 1539. Unlike most artists of his time, Dürer was never forgotten by posterity - on the contrary. Thanks to his outstanding art and self-promotion, his glory remains up until today.",
          kind: "event-kind-death",
          source: {
            citation: "Nachrufe bedeutender Humanisten, Grabplatte",
          },
          startDate: "1528-04-06",
          relations: [
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-person_deceased",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-gr-020",
              role: "role-is_gravesite",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-pr-002",
          label: {
            default: "Anton Koberger",
          },
          linkedIds: [
            {
              id: "118563890",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/118563890",
              },
            },
          ],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-was_godfather",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-001",
          label: {
            default: "Geburt von Albrecht Dürer",
          },
          description:
            "Dürer wird in Nürnberg geboren, sein Pate ist der international bekannte Drucker Anton Koberger, Taufdatum: 21.5.1471",
          kind: "event-kind-birth",
          source: {
            citation: "Dürers Familienchronik",
          },
          startDate: "1471-05-21",
          relations: [
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-person_born",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-002",
              role: "role-was_godfather",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-pr-003",
          label: {
            default: "Michael Wolgemut",
          },
          linkedIds: [
            {
              id: "118771175",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/118771175",
              },
            },
          ],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_teacher",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-002",
          label: {
            default: "Malerlehre bei Michael Wolgemut",
          },
          description: "Malerlehre bei Michael Wolgemut in Nürnberg",
          kind: "event-kind-education",
          source: {
            citation: "Dürers Familienchronik",
          },
          startDate: "1486-01-01",
          endDate: "1489-12-31",
          relations: [
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_student",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-003",
              role: "role-was_teacher",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-pl-002",
          label: {
            default: "Oberrhein",
          },
          relations: [
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-took_place_at",
            },
          ],
          kind: "place",
          type: {
            id: "place-type-city",
            label: {
              default: "city",
            },
          },
          geometry: {
            type: "Point",
            coordinates: [8.34915, 49.69025],
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-003",
          label: {
            default: "Gesellenwanderschaft an den Oberrhein",
          },
          description: "Gesellenwanderschaft an den Oberrhein",
          kind: "event-kind-professional",
          source: {
            citation: "Christoph Scheurl 1515 nach Selbstaussage Dürers",
          },
          startDate: "1490-04-01",
          relations: [
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-participated",
            },
            {
              entity: "data-duerer-macro-pl-002",
              role: "role-took_place_at",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-pr-004",
          label: {
            default: "Martin Schongauer",
          },
          linkedIds: [
            {
              id: "118610430",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/118610430",
              },
            },
          ],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employer",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-004",
          label: {
            default: "Arbeitsaufenthalt bei Martin Schongauer",
          },
          description: "Aufenthalt in der Werkstatt von Martin Schongauer",
          kind: "event-kind-professional",
          startDate: "1494-03-31",
          relations: [
            {
              entity: "data-duerer-macro-pr-004",
              role: "role-was_employer",
            },
            {
              entity: "data-duerer-macro-pl-003",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_employee",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-pl-003",
          label: {
            default: "Colmar",
          },
          relations: [
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-took_place_at",
            },
          ],
          kind: "place",
          type: {
            id: "place-type-city",
            label: {
              default: "city",
            },
          },
          geometry: {
            type: "Point",
            coordinates: [7.377460585, 48.16863472],
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-004",
          label: {
            default: "Arbeitsaufenthalt bei Martin Schongauer",
          },
          description: "Aufenthalt in der Werkstatt von Martin Schongauer",
          kind: "event-kind-professional",
          startDate: "1494-03-31",
          relations: [
            {
              entity: "data-duerer-macro-pr-004",
              role: "role-was_employer",
            },
            {
              entity: "data-duerer-macro-pl-003",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_employee",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-pr-005",
          label: {
            default: "Agnes Dürer",
          },
          alternativeLabels: [
            {
              default: "Agnes Frey",
            },
          ],
          linkedIds: [
            {
              id: "118869051",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/118869051",
              },
            },
          ],
          media: ["data-duerer-macro-m-005"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_wife",
            },
          ],
          kind: "person",
          gender: {
            id: "female",
            label: {
              default: "female",
            },
          },
          biographies: ["data-duerer-macro-bio-002"],
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-005",
          label: {
            default: "Heirat mit Agnes Frey",
          },
          description: "Heirat mit Agnes Frey in Nürnberg",
          kind: "event-kind-family",
          startDate: "1494-04-01",
          relations: [
            {
              entity: "data-duerer-macro-pr-005",
              role: "role-was_wife",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_husband",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-pl-004",
          label: {
            default: "Tirol",
          },
          relations: [
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-took_place_at",
            },
          ],
          kind: "place",
          type: {
            id: "place-type-state",
            label: {
              default: "state",
            },
          },
          geometry: {
            type: "Point",
            coordinates: [11.15441, 46.690182],
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-006",
          label: {
            default: "Erste Italienreise: Tirol",
          },
          description:
            "Erste Italienreise, über Werke rekonstruierbare Aufenthalte in Tirol/Südtirol/Trentino, Venedig",
          kind: "event-kind-travel",
          source: {
            citation:
              "Werke = Landschaftsaquarelle und Kostümstudien, Briefstelle von 1506 „was mir vor 11 Jahren so gut gefallen hat“, Christoph Scheurl 1509 = „als er wieder nach Italien kam“",
          },
          startDate: "1494-05-30",
          relations: [
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_travelling",
            },
            {
              entity: "data-duerer-macro-pl-004",
              role: "role-took_place_at",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-pl-005",
          label: {
            default: "Südtirol",
          },
          relations: [
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-took_place_at",
            },
          ],
          kind: "place",
          type: {
            id: "place-type-state",
            label: {
              default: "state",
            },
          },
          geometry: {
            type: "Point",
            coordinates: [11.43126, 46.382648],
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-007",
          label: {
            default: "Erste Italienreise: Südtirol",
          },
          description: "Erste Italienreise",
          kind: "event-kind-travel",
          source: {
            citation:
              "Werke = Landschaftsaquarelle und Kostümstudien, Briefstelle von 1506 „was mir vor 11 Jahren so gut gefallen hat“, Christoph Scheurl 1509 = „als er wieder nach Italien kam“",
          },
          startDate: "1494-07-31",
          relations: [
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_travelling",
            },
            {
              entity: "data-duerer-macro-pl-005",
              role: "role-took_place_at",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-pl-006",
          label: {
            default: "Trentino",
          },
          relations: [
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-took_place_at",
            },
          ],
          kind: "place",
          type: {
            id: "place-type-state",
            label: {
              default: "state",
            },
          },
          geometry: {
            type: "Point",
            coordinates: [11.14166686, 46.10114108],
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-008",
          label: {
            default: "Erste Italienreise: Trentino",
          },
          description: "Erste Italienreise",
          kind: "event-kind-travel",
          source: {
            citation:
              "Werke = Landschaftsaquarelle und Kostümstudien, Briefstelle von 1506 „was mir vor 11 Jahren so gut gefallen hat“, Christoph Scheurl 1509 = „als er wieder nach Italien kam“",
          },
          startDate: "1494-09-30",
          relations: [
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_travelling",
            },
            {
              entity: "data-duerer-macro-pl-006",
              role: "role-took_place_at",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-pl-007",
          label: {
            default: "Venedig",
          },
          relations: [
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-took_place_at",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-took_place_at",
            },
          ],
          kind: "place",
          type: {
            id: "place-type-city",
            label: {
              default: "city",
            },
          },
          geometry: {
            type: "Point",
            coordinates: [12.33878, 45.434341],
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-009",
          label: {
            default: "Erste Italienreise: Venedig",
          },
          description: "Erste Italienreise",
          kind: "event-kind-travel",
          source: {
            citation:
              "Werke = Landschaftsaquarelle und Kostümstudien, Briefstelle von 1506 „was mir vor 11 Jahren so gut gefallen hat“, Christoph Scheurl 1509 = „als er wieder nach Italien kam“",
          },
          startDate: "1494-12-31",
          relations: [
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_travelling",
            },
            {
              entity: "data-duerer-macro-pl-007",
              role: "role-took_place_at",
            },
          ],
        },
        {
          id: "data-duerer-macro-macro-ev-014",
          label: {
            default: "Zweite Italienreise: Venedig",
          },
          description: "Zweite Italienreise, Aufenthalte in Venedig und Bologna",
          kind: "event-kind-travel",
          source: {
            citation:
              "Briefe aus Venedig, Gemälde, Christoph Scheurl 1509 = diente ihm in Venedig und Bologna als Übersetzer",
          },
          startDate: "1505-11-30",
          relations: [
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_travelling",
            },
            {
              entity: "data-duerer-macro-pl-007",
              role: "role-took_place_at",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-gr-001",
          label: {
            default: "Maler- und Graphikwerkstatt",
          },
          description: "Dürer baut Maler- und Graphikwerkstatt in Nürnberg auf",
          source: {
            citation: "Arbeitsverträge, frühe Kopien der Druckgraphiken vor 1500",
          },
          relations: [
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded",
            },
          ],
          kind: "group",
          type: {
            id: "group-type-workspace",
            label: {
              default: "workspace",
            },
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-010",
          label: {
            default: "Aufbau einer Maler- und Graphikwerkstatt",
          },
          description:
            "Aufbau einer Maler- und Graphikwerkstatt in Nürnberg mit internationalem Vertriebsnetz, ab 1497 erste Angestellte",
          kind: "event-kind-founding",
          source: {
            citation: "Arbeitsverträge, frühe Kopien der Druckgraphiken vor 1500",
          },
          startDate: "1495-05-30",
          relations: [
            {
              entity: "data-duerer-macro-gr-001",
              role: "role-was_founded",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_founded_by",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-ob-001",
          label: {
            default: "Apokalypse",
          },
          description: "Mit der „Apokalypse“ erscheint Dürers erstes großes Buch",
          source: {
            citation: "Kolophon",
          },
          relations: [
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-object_created",
            },
          ],
          kind: "cultural-heritage-object",
          type: {
            id: "cultural-heritage-object-type-book",
            label: {
              default: "book",
            },
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-011",
          label: {
            default: "Apokalypse erscheint",
          },
          description: "Mit der „Apokalypse“ erscheint Dürers erstes großes Buch",
          kind: "event-kind-creation",
          source: {
            citation: "Kolophon",
          },
          startDate: "1498-01-01",
          relations: [
            {
              entity: "data-duerer-macro-ob-001",
              role: "role-object_created",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_created_by",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-ob-002",
          label: {
            default: "Selbstbildnis im Pelzrock",
          },
          media: ["data-duerer-macro-m-006"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-object_created",
            },
          ],
          kind: "cultural-heritage-object",
          type: {
            id: "cultural-heritage-object-type-drawing",
            label: {
              default: "drawing",
            },
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-012",
          label: {
            default: "Selbstbildnis im Pelzrock erstellt",
          },
          description: "Selbstbildnis im Pelzrock (München, Alte Pinakothek)",
          kind: "event-kind-creation",
          source: {
            citation: "Datierung auf Bild, Physiognomie",
          },
          startDate: "1500-01-01",
          relations: [
            {
              entity: "data-duerer-macro-ob-002",
              role: "role-object_created",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_created_by",
            },
            {
              entity: "data-duerer-macro-gr-002",
              role: "role-current_location",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-gr-002",
          label: {
            default: "München, Alte Pinakothek",
          },
          relations: [
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-current_location",
            },
          ],
          kind: "group",
          type: {
            id: "group-type-museum",
            label: {
              default: "museum",
            },
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-012",
          label: {
            default: "Selbstbildnis im Pelzrock erstellt",
          },
          description: "Selbstbildnis im Pelzrock (München, Alte Pinakothek)",
          kind: "event-kind-creation",
          source: {
            citation: "Datierung auf Bild, Physiognomie",
          },
          startDate: "1500-01-01",
          relations: [
            {
              entity: "data-duerer-macro-ob-002",
              role: "role-object_created",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_created_by",
            },
            {
              entity: "data-duerer-macro-gr-002",
              role: "role-current_location",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-ob-003",
          label: {
            default: "Der Hase",
          },
          description:
            'The "Young Hare", dated 1502, counts among Dürer\'s most famous works. The highly detailed drawing of the animal still fascinates today.',
          media: ["data-duerer-macro-m-034"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-object_created",
            },
          ],
          kind: "cultural-heritage-object",
          type: {
            id: "cultural-heritage-object-type-drawing",
            label: {
              default: "drawing",
            },
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-013",
          label: {
            default: "„Der Hase“ erstellt",
          },
          description: "„Der Hase“ als erstes Tieraquarell",
          kind: "event-kind-creation",
          source: {
            citation: "Datierung auf Bild, ähnliche zeitnahe Studien",
          },
          startDate: "1502-01-01",
          relations: [
            {
              entity: "data-duerer-macro-ob-003",
              role: "role-object_created",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_created_by",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-pl-008",
          label: {
            default: "Bologna",
          },
          relations: [
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-took_place_at",
            },
          ],
          kind: "place",
          type: {
            id: "place-type-city",
            label: {
              default: "city",
            },
          },
          geometry: {
            type: "Point",
            coordinates: [11.34163535, 44.49392625],
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-015",
          label: {
            default: "Zweite Italienreise: Bologna",
          },
          description: "Zweite Italienreise, Aufenthalte in Venedig und Bologna",
          kind: "event-kind-travel",
          source: {
            citation:
              "Briefe aus Venedig, Gemälde, Christoph Scheurl 1509 = diente ihm in Venedig und Bologna als Übersetzer",
          },
          startDate: "1506-06-30",
          relations: [
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_travelling",
            },
            {
              entity: "data-duerer-macro-pl-008",
              role: "role-took_place_at",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-ob-007",
          label: {
            default: "Dürer-Haus",
          },
          media: ["data-duerer-macro-m-038"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-object_bought",
            },
          ],
          kind: "cultural-heritage-object",
          type: {
            id: "cultural-heritage-object-type-building",
            label: {
              default: "building",
            },
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-017",
          label: {
            default: "Kauf des „Dürer-Hauses“",
          },
          description: "Kauf des „Dürer-Hauses“ am Tiergärtnertor in Nürnberg",
          kind: "event-kind-bussines",
          source: {
            citation: "Urkunde",
          },
          startDate: "1509-01-01",
          relations: [
            {
              entity: "data-duerer-macro-ob-007",
              role: "role-object_bought",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_bought_by",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-ob-004",
          label: {
            default: "Ritter, Tod und Teufel",
          },
          description: "Drei Meisterstiche",
          media: ["data-duerer-macro-m-035"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-object_created",
            },
          ],
          kind: "cultural-heritage-object",
          type: {
            id: "cultural-heritage-object-type-engraving",
            label: {
              default: "engraving",
            },
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-018",
          label: {
            default: "Drei Meisterstiche: „Ritter, Tod und Teufel“",
          },
          description:
            "Drei Meisterstiche („Ritter, Tod und Teufel“, „Hieronymus im Gehäus“, „Melancholie“)",
          kind: "event-kind-creation",
          source: {
            citation: "Datierung auf Kupferstichen",
          },
          startDate: "1513-01-01",
          relations: [
            {
              entity: "data-duerer-macro-ob-004",
              role: "role-object_created",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_created_by",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-ob-005",
          label: {
            default: "Hieronymus im Gehäus",
          },
          description: "Drei Meisterstiche",
          media: ["data-duerer-macro-m-036"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-object_created",
            },
          ],
          kind: "cultural-heritage-object",
          type: {
            id: "cultural-heritage-object-type-engraving",
            label: {
              default: "engraving",
            },
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-019",
          label: {
            default: "Drei Meisterstiche: „Hieronymus im Gehäus“",
          },
          description:
            "Drei Meisterstiche („Ritter, Tod und Teufel“, „Hieronymus im Gehäus“, „Melancholie“)",
          kind: "event-kind-creation",
          source: {
            citation: "Datierung auf Kupferstichen",
          },
          startDate: "1513-01-01",
          relations: [
            {
              entity: "data-duerer-macro-ob-005",
              role: "role-object_created",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_created_by",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-ob-006",
          label: {
            default: "Melancholie",
          },
          description:
            'Drei Meisterstiche, Dürer\'s "Melancholia" (1514) is his best known master engraving. The winged female figure of melancholy, deep in her thoughts, is surrounded by meticulously rendered objects related to geometry, astrology and mathematics. The scribbling putto adds a playful note to this enigmatic scene which culminates in the cry of the beat-like creature. ',
          media: ["data-duerer-macro-m-037"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-object_created",
            },
          ],
          kind: "cultural-heritage-object",
          type: {
            id: "cultural-heritage-object-type-engraving",
            label: {
              default: "engraving",
            },
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-020",
          label: {
            default: "Drei Meisterstiche: „Melancholie“",
          },
          description:
            "Drei Meisterstiche („Ritter, Tod und Teufel“, „Hieronymus im Gehäus“, „Melancholie“)",
          kind: "event-kind-creation",
          source: {
            citation: "Datierung auf Kupferstichen",
          },
          startDate: "1513-01-01",
          relations: [
            {
              entity: "data-duerer-macro-ob-006",
              role: "role-object_created",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_created_by",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-ob-009",
          label: {
            default: "Portrait von Kaiser Maximilian",
          },
          relations: [
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-object_created",
            },
          ],
          kind: "cultural-heritage-object",
          type: {
            id: "cultural-heritage-object-type-drawing",
            label: {
              default: "drawing",
            },
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-021",
          label: {
            default: "Portrait von Kaiser Maximilian",
          },
          description: "Reichstag (Portrait von Kaiser Maximilian)",
          kind: "event-kind-creation",
          startDate: "1517-05-30",
          relations: [
            {
              entity: "data-duerer-macro-ob-009",
              role: "role-object_created",
            },
            {
              entity: "data-duerer-macro-pl-009",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_created_by",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-pl-009",
          label: {
            default: "Augsburg",
          },
          relations: [
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-took_place_at",
            },
          ],
          kind: "place",
          type: {
            id: "place-type-city",
            label: {
              default: "city",
            },
          },
          geometry: {
            type: "Point",
            coordinates: [10.98959125, 48.41017875],
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-021",
          label: {
            default: "Portrait von Kaiser Maximilian",
          },
          description: "Reichstag (Portrait von Kaiser Maximilian)",
          kind: "event-kind-creation",
          startDate: "1517-05-30",
          relations: [
            {
              entity: "data-duerer-macro-ob-009",
              role: "role-object_created",
            },
            {
              entity: "data-duerer-macro-pl-009",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_created_by",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-ob-010",
          label: {
            default: "Ehrenpforte für Kaiser Maximilian I. (Riesenholzschnitt)",
          },
          relations: [
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-object_created",
            },
          ],
          kind: "cultural-heritage-object",
          type: {
            id: "cultural-heritage-object-type-woodcut",
            label: {
              default: "woodcut",
            },
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-022",
          label: {
            default: "Ehrenpforte für Kaiser Maximilian I.",
          },
          description: "Ehrenpforte für Kaiser Maximilian I. (Riesenholzschnitt)",
          kind: "event-kind-creation",
          source: {
            citation: "Korrespondenz, Datierung auf Holzschnitt",
          },
          startDate: "1517-07-31",
          relations: [
            {
              entity: "data-duerer-macro-ob-010",
              role: "role-object_created",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_created_by",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-pl-010",
          label: {
            default: "Köln",
          },
          alternativeLabels: [
            {
              default: "Cologne",
            },
          ],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-took_place_at",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-took_place_at",
            },
          ],
          kind: "place",
          type: {
            id: "place-type-city",
            label: {
              default: "city",
            },
          },
          geometry: {
            type: "Point",
            coordinates: [6.951517268, 50.97340752],
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-024",
          label: {
            default: "Station auf der Hinreise mit Besuch seines Vetters",
          },
          description: "Station auf der Hinreise mit Besuch seines Vetters",
          kind: "event-kind-travel",
          startDate: "1520-07-25",
          endDate: "1520-07-28",
          relations: [
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_travelling",
            },
            {
              entity: "data-duerer-macro-pl-010",
              role: "role-took_place_at",
            },
          ],
        },
        {
          id: "data-duerer-macro-macro-ev-030",
          label: {
            default: "Station auf der Rückreise mit Teilnahme an Empfang Karls V",
          },
          description:
            "Station auf der Rückreise mit Teilnahme an Empfang Karls V.",
          kind: "event-kind-event",
          startDate: "1520-10-26",
          endDate: "1520-11-13",
          relations: [
            {
              entity: "data-duerer-macro-pr-007",
              role: "role-participated",
            },
            {
              entity: "data-duerer-macro-pl-010",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-participated",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-he-001",
          label: {
            default: "Krönung Karl V",
          },
          relations: [
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-is_historical_event",
            },
          ],
          kind: "historical-event",
          type: {
            id: "historical-event-type-coronation",
            label: {
              default: "coronation",
            },
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-025",
          label: {
            default: "Krönung Karl V",
          },
          description: "Krönung Karl V",
          kind: "event-kind-event",
          startDate: "1520-10-07",
          endDate: "1520-10-25",
          relations: [
            {
              entity: "data-duerer-macro-he-001",
              role: "role-is_historical_event",
            },
            {
              entity: "data-duerer-macro-pl-011",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-007",
              role: "role-participated",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-participated",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-pl-011",
          label: {
            default: "Aachen",
          },
          relations: [
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-took_place_at",
            },
          ],
          kind: "place",
          type: {
            id: "place-type-city",
            label: {
              default: "city",
            },
          },
          geometry: {
            type: "Point",
            coordinates: [6.258080332, 50.77997052],
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-025",
          label: {
            default: "Krönung Karl V",
          },
          description: "Krönung Karl V",
          kind: "event-kind-event",
          startDate: "1520-10-07",
          endDate: "1520-10-25",
          relations: [
            {
              entity: "data-duerer-macro-he-001",
              role: "role-is_historical_event",
            },
            {
              entity: "data-duerer-macro-pl-011",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-007",
              role: "role-participated",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-participated",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-pr-007",
          label: {
            default: "Karl V",
          },
          alternativeLabels: [
            {
              default: "Charles V.",
            },
          ],
          linkedIds: [
            {
              id: "118560093",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/118560093",
              },
            },
          ],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-025",
          label: {
            default: "Krönung Karl V",
          },
          description: "Krönung Karl V",
          kind: "event-kind-event",
          startDate: "1520-10-07",
          endDate: "1520-10-25",
          relations: [
            {
              entity: "data-duerer-macro-he-001",
              role: "role-is_historical_event",
            },
            {
              entity: "data-duerer-macro-pl-011",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-007",
              role: "role-participated",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-participated",
            },
          ],
        },
        {
          id: "data-duerer-macro-macro-ev-030",
          label: {
            default: "Station auf der Rückreise mit Teilnahme an Empfang Karls V",
          },
          description:
            "Station auf der Rückreise mit Teilnahme an Empfang Karls V.",
          kind: "event-kind-event",
          startDate: "1520-10-26",
          endDate: "1520-11-13",
          relations: [
            {
              entity: "data-duerer-macro-pr-007",
              role: "role-participated",
            },
            {
              entity: "data-duerer-macro-pl-010",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-participated",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-pl-012",
          label: {
            default: "Antwerpen",
          },
          alternativeLabels: [
            {
              default: "Antwerp",
            },
          ],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-took_place_at",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-took_place_at",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-took_place_at",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-took_place_at",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-took_place_at",
            },
          ],
          kind: "place",
          type: {
            id: "place-type-city",
            label: {
              default: "city",
            },
          },
          geometry: {
            type: "Point",
            coordinates: [4.344625773, 51.30232385],
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-026",
          label: {
            default: "Hauptstandort",
          },
          description: "Hauptstandort",
          kind: "event-kind-travel",
          startDate: "1520-08-02",
          endDate: "1520-08-25",
          relations: [
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_travelling",
            },
            {
              entity: "data-duerer-macro-pl-012",
              role: "role-took_place_at",
            },
          ],
        },
        {
          id: "data-duerer-macro-macro-ev-029",
          label: {
            default: "Hauptstandort",
          },
          description: "Hauptstandort",
          kind: "event-kind-travel",
          startDate: "1520-09-03",
          endDate: "1520-10-25",
          relations: [
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_travelling",
            },
            {
              entity: "data-duerer-macro-pl-012",
              role: "role-took_place_at",
            },
          ],
        },
        {
          id: "data-duerer-macro-macro-ev-031",
          label: {
            default: "Hauptstandort",
          },
          description: "Hauptstandort",
          kind: "event-kind-travel",
          startDate: "1520-11-14",
          endDate: "1521-04-06",
          relations: [
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_travelling",
            },
            {
              entity: "data-duerer-macro-pl-012",
              role: "role-took_place_at",
            },
          ],
        },
        {
          id: "data-duerer-macro-macro-ev-034",
          label: {
            default: "Hauptstandort",
          },
          description: "Hauptstandort",
          kind: "event-kind-travel",
          startDate: "1521-04-12",
          endDate: "1521-06-05",
          relations: [
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_travelling",
            },
            {
              entity: "data-duerer-macro-pl-012",
              role: "role-took_place_at",
            },
          ],
        },
        {
          id: "data-duerer-macro-macro-ev-036",
          label: {
            default: "Hauptstandort",
          },
          description: "Hauptstandort",
          kind: "event-kind-travel",
          startDate: "1521-06-09",
          endDate: "1521-07-02",
          relations: [
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_travelling",
            },
            {
              entity: "data-duerer-macro-pl-012",
              role: "role-took_place_at",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-pr-006",
          label: {
            default: "Konrat Meit",
          },
          relations: [
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          occupations: ["occupation-bildhauer"],
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-027",
          label: {
            default: "Besuch des Bildhauers Konrat Meit",
          },
          description: "Besuch des Bildhauers Konrat Meit",
          kind: "event-kind-meeting",
          startDate: "1520-08-26",
          relations: [
            {
              entity: "data-duerer-macro-pr-006",
              role: "role-participated",
            },
            {
              entity: "data-duerer-macro-pl-013",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-participated",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-pl-013",
          label: {
            default: "Mecheln",
          },
          alternativeLabels: [
            {
              default: "Mechelen",
            },
          ],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-took_place_at",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-took_place_at",
            },
          ],
          kind: "place",
          type: {
            id: "place-type-city",
            label: {
              default: "city",
            },
          },
          geometry: {
            type: "Point",
            coordinates: [4.479117295, 51.02651151],
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-027",
          label: {
            default: "Besuch des Bildhauers Konrat Meit",
          },
          description: "Besuch des Bildhauers Konrat Meit",
          kind: "event-kind-meeting",
          startDate: "1520-08-26",
          relations: [
            {
              entity: "data-duerer-macro-pr-006",
              role: "role-participated",
            },
            {
              entity: "data-duerer-macro-pl-013",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-participated",
            },
          ],
        },
        {
          id: "data-duerer-macro-macro-ev-035",
          label: {
            default: "Besuch Margaretes von Österreich (1521)",
          },
          description: "Besuch Margaretes von Österreich (1521)",
          kind: "event-kind-meeting",
          startDate: "1521-06-06",
          endDate: "1521-06-08",
          relations: [
            {
              entity: "data-duerer-macro-pr-008",
              role: "role-participated",
            },
            {
              entity: "data-duerer-macro-pl-013",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-participated",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-pl-014",
          label: {
            default: "Brüssel",
          },
          alternativeLabels: [
            {
              default: "Brussels",
            },
          ],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-took_place_at",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-took_place_at",
            },
          ],
          kind: "place",
          type: {
            id: "place-type-city",
            label: {
              default: "city",
            },
          },
          geometry: {
            type: "Point",
            coordinates: [4.319246516, 50.95522847],
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-028",
          label: {
            default: "Kontakte zu Hofkreisen (1520)",
          },
          description: "Kontakte zu Hofkreisen (1520)",
          kind: "event-kind-meeting",
          startDate: "1520-08-27",
          endDate: "1520-09-02",
          relations: [
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-participated",
            },
            {
              entity: "data-duerer-macro-pl-014",
              role: "role-took_place_at",
            },
          ],
        },
        {
          id: "data-duerer-macro-macro-ev-037",
          label: {
            default: "Porträtauftrag des dänischen Königs Christian II.",
          },
          description: "Porträtauftrag des dänischen Königs Christian II. (1521)",
          kind: "event-kind-creation",
          startDate: "1521-07-03",
          endDate: "1521-07-11",
          relations: [
            {
              entity: "data-duerer-macro-ob-011",
              role: "role-object_created",
            },
            {
              entity: "data-duerer-macro-pl-014",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_created_by",
            },
            {
              entity: "data-duerer-macro-pr-012",
              role: "role-comissioned_by",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-pl-015",
          label: {
            default: "Brügge",
          },
          alternativeLabels: [
            {
              default: "Bruges",
            },
          ],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-took_place_at",
            },
          ],
          kind: "place",
          type: {
            id: "place-type-city",
            label: {
              default: "city",
            },
          },
          geometry: {
            type: "Point",
            coordinates: [3.210779284, 51.28033424],
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-032",
          label: {
            default: "Besuch von Bau- und Kunstwerken",
          },
          description: "Besuch von Bau- und Kunstwerken",
          kind: "event-kind-travel",
          startDate: "1521-04-07",
          endDate: "1521-04-08",
          relations: [
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_travelling",
            },
            {
              entity: "data-duerer-macro-pl-015",
              role: "role-took_place_at",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-pl-016",
          label: {
            default: "Gent",
          },
          alternativeLabels: [
            {
              default: "Ghent",
            },
          ],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-took_place_at",
            },
          ],
          kind: "place",
          type: {
            id: "place-type-city",
            label: {
              default: "city",
            },
          },
          geometry: {
            type: "Point",
            coordinates: [3.765888767, 51.14322955],
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-033",
          label: {
            default: "Besuch von Bau- und Kunstwerken",
          },
          description: "Besuch von Bau- und Kunstwerken",
          kind: "event-kind-travel",
          startDate: "1521-04-09",
          endDate: "1521-04-11",
          relations: [
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_travelling",
            },
            {
              entity: "data-duerer-macro-pl-016",
              role: "role-took_place_at",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-pr-008",
          label: {
            default: "Margarete von Österreich",
          },
          relations: [
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
          ],
          kind: "person",
          gender: {
            id: "female",
            label: {
              default: "female",
            },
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-035",
          label: {
            default: "Besuch Margaretes von Österreich (1521)",
          },
          description: "Besuch Margaretes von Österreich (1521)",
          kind: "event-kind-meeting",
          startDate: "1521-06-06",
          endDate: "1521-06-08",
          relations: [
            {
              entity: "data-duerer-macro-pr-008",
              role: "role-participated",
            },
            {
              entity: "data-duerer-macro-pl-013",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-participated",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-ob-011",
          label: {
            default: "Porträtauftrag des dänischen Königs Christian II. (1521)",
          },
          description:
            "Christian II of Denmark, who is married to Charles' V sister and stays at the court of Brussels, commissions Dürer to paint his portrait. The painting is lost, but a drawing gives an impression of Dürer's work.",
          media: ["data-duerer-macro-m-029"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-object_created",
            },
          ],
          kind: "cultural-heritage-object",
          type: {
            id: "cultural-heritage-object-type-drawing",
            label: {
              default: "drawing",
            },
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-037",
          label: {
            default: "Porträtauftrag des dänischen Königs Christian II.",
          },
          description: "Porträtauftrag des dänischen Königs Christian II. (1521)",
          kind: "event-kind-creation",
          startDate: "1521-07-03",
          endDate: "1521-07-11",
          relations: [
            {
              entity: "data-duerer-macro-ob-011",
              role: "role-object_created",
            },
            {
              entity: "data-duerer-macro-pl-014",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_created_by",
            },
            {
              entity: "data-duerer-macro-pr-012",
              role: "role-comissioned_by",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-pr-012",
          label: {
            default: "Christian II, King of Denmark",
          },
          linkedIds: [
            {
              id: "119195380",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/119195380",
              },
            },
          ],
          media: ["data-duerer-macro-m-029"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-comissioned_by",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-037",
          label: {
            default: "Porträtauftrag des dänischen Königs Christian II.",
          },
          description: "Porträtauftrag des dänischen Königs Christian II. (1521)",
          kind: "event-kind-creation",
          startDate: "1521-07-03",
          endDate: "1521-07-11",
          relations: [
            {
              entity: "data-duerer-macro-ob-011",
              role: "role-object_created",
            },
            {
              entity: "data-duerer-macro-pl-014",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_created_by",
            },
            {
              entity: "data-duerer-macro-pr-012",
              role: "role-comissioned_by",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-ob-008",
          label: {
            default:
              "Theoretische Schriften zur Perspektive, menschlichen Proportion und dem Festungsbau in deutscher Sprache",
          },
          description:
            'Between 1525 and 1528, Dürer edits his three theoretical treatises, the "Theory of Perspective" (1525), the "Treatise on Fortifications" (1527), and the "Book of Proportions" (1528), published postumously by his wife Agnes. Since the beginning of the 16th century, Dürer had worked on the texts and illustrations, trying to unravel the "secrets of perspective" and different methods to calculate human proportions. Dürer\'s original German versions were translated into Latin and other languages.',
          source: {
            citation: "Kolophone",
          },
          media: ["data-duerer-macro-m-043"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-object_created",
            },
          ],
          kind: "cultural-heritage-object",
          type: {
            id: "cultural-heritage-object-type-manuscript",
            label: {
              default: "manuscript",
            },
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-039",
          label: {
            default:
              "Theoretische Schriften zur Perspektive, menschlichen Proportion und dem Festungsbau in deutscher Sprache",
          },
          description:
            "Theoretische Schriften zur Perspektive, menschlichen Proportion und dem Festungsbau in deutscher Sprache",
          kind: "event-kind-creation",
          source: {
            citation: "Kolophone",
          },
          startDate: "1525-01-01",
          endDate: "1528-04-05",
          relations: [
            {
              entity: "data-duerer-macro-ob-008",
              role: "role-object_created",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-was_created_by",
            },
          ],
        },
      ],
    },
    {
      source: {
        entity: {
          id: "data-duerer-macro-pr-001",
          label: {
            default: "Albrecht Dürer",
          },
          linkedIds: [
            {
              id: "11852786X",
              provider: {
                label: "GND",
                baseUrl: "https://d-nb.info/gnd/11852786X",
              },
            },
          ],
          media: ["data-duerer-macro-m-006", "data-duerer-macro-m-046"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-001",
              role: "role-person_born",
            },
            {
              event: "data-duerer-macro-macro-ev-002",
              role: "role-was_student",
            },
            {
              event: "data-duerer-macro-macro-ev-003",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-004",
              role: "role-was_employee",
            },
            {
              event: "data-duerer-macro-macro-ev-005",
              role: "role-was_husband",
            },
            {
              event: "data-duerer-macro-macro-ev-006",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-007",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-008",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-009",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-010",
              role: "role-was_founded_by",
            },
            {
              event: "data-duerer-macro-macro-ev-011",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-012",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-013",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-014",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-015",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-016",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-017",
              role: "role-was_bought_by",
            },
            {
              event: "data-duerer-macro-macro-ev-018",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-019",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-020",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-021",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-022",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-023",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-024",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-025",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-026",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-027",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-028",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-029",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-030",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-031",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-032",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-033",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-034",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-035",
              role: "role-participated",
            },
            {
              event: "data-duerer-macro-macro-ev-036",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-037",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-038",
              role: "role-was_travelling",
            },
            {
              event: "data-duerer-macro-macro-ev-039",
              role: "role-was_created_by",
            },
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-person_deceased",
            },
          ],
          kind: "person",
          gender: {
            id: "male",
            label: {
              default: "male",
            },
          },
          biographies: ["data-duerer-macro-bio-001"],
        },
        x: 0,
        y: 0,
        isPrimary: true,
      },
      target: {
        entity: {
          id: "data-duerer-macro-gr-020",
          label: {
            default: "Johannisfriedhof",
          },
          media: ["data-duerer-macro-m-044"],
          relations: [
            {
              event: "data-duerer-macro-macro-ev-040",
              role: "role-is_gravesite",
            },
          ],
          kind: "group",
          type: {
            id: "group-type-cemitery",
            label: {
              default: "cemitery",
            },
          },
        },
        x: 0,
        y: 0,
        isPrimary: false,
      },
      roles: [
        {
          id: "data-duerer-macro-macro-ev-040",
          label: {
            default:
              "Dürer stirbt in Nürnberg und wird auf dem Johannisfriedhof begraben",
          },
          description:
            "Dürer stirbt in Nürnberg und wird auf dem Johannisfriedhof begraben; Dürer died on April 6, 1528 at the age of 56 in his house in Nuremberg after a short illness. He was buried in the family grave of his parents-in-law on St John's graveyard in Nuremberg. His wife Agnes continued to run the workshop until her own death in 1539. Unlike most artists of his time, Dürer was never forgotten by posterity - on the contrary. Thanks to his outstanding art and self-promotion, his glory remains up until today.",
          kind: "event-kind-death",
          source: {
            citation: "Nachrufe bedeutender Humanisten, Grabplatte",
          },
          startDate: "1528-04-06",
          relations: [
            {
              entity: "data-duerer-macro-pr-001",
              role: "role-person_deceased",
            },
            {
              entity: "data-duerer-macro-pl-001",
              role: "role-took_place_at",
            },
            {
              entity: "data-duerer-macro-gr-020",
              role: "role-is_gravesite",
            },
          ],
        },
      ],
    },
  ];



