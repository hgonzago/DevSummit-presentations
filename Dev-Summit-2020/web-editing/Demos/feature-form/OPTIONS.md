### `FeatureForm` option showcase

_Note_: each example builds off the previous one

#### Label field

```tsx
  fieldConfig: [
    { name: "LOCATION", label: "Location" },
    { name: "ENCOUNTER", label: "Encounter" },
    { name: "DATE_OF_EN", label: "Date of Encounter" },
    { name: "Verified" },
    { name: "Reviewer" },
    { name: "InteralID", label: "Internal ID" } // 'fix' typo :)
  ]
```

#### Reorder field

```tsx
  fieldConfig: [
    { name: "ENCOUNTER", label: "Encounter" }, // move to top
    { name: "LOCATION", label: "Location" },
    { name: "DATE_OF_EN", label: "Date of Encounter" },
    { name: "Verified" },
    { name: "Reviewer" },
    { name: "InteralID", label: "Internal ID" }
  ]
```

#### Omit field

```tsx
  fieldConfig: [
    { name: "ENCOUNTER", label: "Encounter" },
    { name: "LOCATION", label: "Location" },
    { name: "DATE_OF_EN", label: "Date of Encounter" },
    { name: "Verified" },
    { name: "Reviewer" }
    // hide internal ID by excluding it
  ]
```

#### Describe field

```tsx
  fieldConfig: [
    {
      name: "ENCOUNTER",
      label: "Encounter Type",
      description: "Select from: 'Encounter', 'Sighting', 'Garbage', 'Feeding'"
    },
    { name: "LOCATION", label: "Location" },
    { name: "DATE_OF_EN", label: "Date of Encounter" },
    { name: "Verified" },
    { name: "Reviewer" }
  ]
```

#### Provide list of options†

```tsx
  fieldConfig: [
    {
      name: "ENCOUNTER",
      label: "Type",
      domain: {
        type: "coded-value",
        name: "encounter-types",
        codedValues: [
          { name: "Encounter", code: "Encounter" },
          { name: "Sighting", code: "Sighting" },
          { name: "Garbage", code: "Garbage" },
          { name: "Feeding", code: "Feeding" }
        ]
      }
    },
    { name: "LOCATION", label: "Location" },
    { name: "DATE_OF_EN", label: "Date of Encounter" },
    { name: "Verified" },
    { name: "Reviewer" }
  ]
```

† cannot override service-defined codes

#### Disable editing†

```tsx
  fieldConfig: [
    {
      name: "ENCOUNTER",
      label: "Type",
      domain: {
        type: "coded-value",
        name: "encounter-types",
        codedValues: [
          { name: "Encounter", code: "Encounter" },
          { name: "Sighting", code: "Sighting" },
          { name: "Garbage", code: "Garbage" },
          { name: "Feeding", code: "Feeding" }
        ]
      }
    },
    { name: "LOCATION", label: "Location" },
    { name: "DATE_OF_EN", label: "Date of Encounter" },
    { name: "Verified", editable: false },
    { name: "Reviewer", editable: false }
  ]
```

† cannot enable if editing is disallowed by service

#### Groups fields (w/ description)

```
  fieldConfig: [

    // general information group
    {
      label: "General Information",
      description: "Specifics about the encounter.",

      fieldConfig: [
        {
          name: "ENCOUNTER",
          label: "Type",
          domain: {
            type: "coded-value",
            name: "encounter-types",
            codedValues: [
              { name: "Encounter", code: "Encounter" },
              { name: "Sighting", code: "Sighting" },
              { name: "Garbage", code: "Garbage" },
              { name: "Feeding", code: "Feeding" }
            ]
          }
        },
        { name: "LOCATION", label: "Location" },
        { name: "DATE_OF_EN", label: "Date of Encounter" }
      ]

    },

    // status group
    {
      label: "Status",
      description: "Track progress on this event.",

      fieldConfig: [
        { name: "Verified", editable: false },
        { name: "Reviewer", editable: false }
      ]

    }
  ]
```

#### Show one group at a time

```tsx
  groupDisplay: "sequential",
```

#### Conditionally show fields

Only show location field if encounter is "Garbage"

```tsx
  fieldConfig: [
    {
      label: "General Information",
      description: "Specifics about the encounter.",
      fieldConfig: [
        {
          name: "ENCOUNTER",
          label: "Type",
          domain: {
            type: "coded-value",
            name: "encounter-types",
            codedValues: [
              { name: "Encounter", code: "Encounter" },
              { name: "Sighting", code: "Sighting" },
              { name: "Garbage", code: "Garbage" },
              { name: "Feeding", code: "Feeding" }
            ]
          }
        },
        {
          name: "LOCATION",
          label: "Location",
          visibilityExpression: "$feature.ENCOUNTER == 'Garbage'"
        },
        { name: "DATE_OF_EN", label: "Date of Encounter" }
      ]
    },
    {
      label: "Status",
      description: "Track progress on this event.",
      fieldConfig: [
        { name: "Verified", editable: false },
        { name: "Reviewer", editable: false }
      ]
    }
  ]
```
