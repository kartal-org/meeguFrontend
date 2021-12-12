# Reusable Components and Hooks Guide

This is to ensure all members of the group are able to understand what has been done already.

## Available Components

In the src/materialUI/components/reuseableComponents directory, you can see the available reusable components:

dd

### `card component`

The standard card component of the project.\

### How to use?

**_Example Usage:_**

```
<CardHolder>
  {items.map((item) => (
    <CardComponent item={item} link={`/works/${item.id}?tab=dashboard`}> "Your Card Component Contents here"</CardComponent>
  ))}
</CardHolder>
```

Props for card components:

| Props Keyword  | Description                                                                                                       | Type      | Required |
| -------------- | ----------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| **_item_**     | object you want to render in the card                                                                             | object    | true     |
| **_link_**     | if you want redirect after clicking the card                                                                      | string    | false    |
| **_onClick_**  | makes the card component acts like a button                                                                       | function  | false    |
| **_height_**   | if you want to specify the height of the card                                                                     | string    | false    |
| **_image_**    | if you want image on the card                                                                                     | string    | false    |
| **_children_** | to customize what would be the contents of the card for example if you want to put button or any other components | component | false    |

### `dialog component`

Launches a pop up modal.

### How to use?

**_Example Usage:_**

```
<DialogComponent
  button={<Button variant='contained'>Join Classroom</Button>}
  title='Join Classroom'
  context='Collaborate with your classmates and discover something!'
  action={{ label: 'Join', handler: handleSubmit }}
  >
    <TextField
      id='standard-search'
      label='Code'
      variant='standard'
      name='sectionCode'
      value={sectionCode}
      onChange={(e) => onChange(e)}
      sx={{
        width: '520px',
        marginBottom: '3px',
        marginTop: '15px',
        marginLeft: '15px',
        padding: '2px',
        fontWeight: 'bold',
      }}
    />
</DialogComponent>
```

Props for dialog components:

| Props Keyword  | Description                                                                                                             | Type      | Required |
| -------------- | ----------------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| **_title_**    | The title that you see above on the upper part of the modal                                                             | string    | false    |
| **_context_**  | A subtitle below the title                                                                                              | string    | false    |
| **_action_**   | compose of label and the handler. This describe the button ok of the dialog                                             | object    | false    |
| **_height_**   | if you want to specify the height of the card                                                                           | string    | false    |
| **_maxWidth_** | specify maxWidth ("lg", "md", etc.)                                                                                     | string    | false    |
| **_children_** | to customize what would be the contents inside the dialog for example if you want to put button or any other components | component | false    |

## Available Hooks

### `useFetch`

Uses the fetched data and updates the component state for you. It requires object or array of object and return an object which compose of an object,**_items_** and a function, **_setItems_**

### How to use?

**_Example Usage:_**

```
useEffect(() => {
  dispatch(getClassroom()); # dispatch an action in the backend
}, []);
const { classes } = useSelector((state) => state.class); # get data from redux
const { items: classrooms, setItems: setClassrooms } = useFetch(classes); # using useFetch hook
```

> Note: Assign alias name for the returned **_items_** and **_setItems_** to avoid confusion and improve code readablity

py manage.py createpostscategory
py manage.py createinstitutionstafftype
py manage.py createsubscriptionsplans
