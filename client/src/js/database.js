import { openDB }  from 'idb'
import 'regenerator-runtime/runtime'

export const initDb = async() => {
    openDB('contact_db', 1, {
        upgrade(db) {
            if (db.objectStoreNames.contains('contacts')) {
                console.log('contact store already exists')
                return
            }

            db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true })
            console.log('contacts store created')
        }
    })
}

export const getDb = async () => {
    console.log('GET from the database')

    // Create connection to the IndexedDB database and the version we want to use
    const contactDb = await openDB('contact_db', 1)

    // Create a new transaction and specify the store and data priveleges
    const tx = contactDb.transaction('contacts', 'readonly')

    // Open up the desired object store
    const store = tx.objectStore('contacts')

    // Use the getAll() method to get all data in the database
    const request = store.getAll()

    // Get confirmation of the request
    const result = await request
    console.log('result.value', result)
    return result
}

export const postDb = async (name, email, phone, profile) => {
    console.log('POST to the database');
  
    // Create a connection to the database and specify the version we want to use.
    const contactDb = await openDB('contact_db', 1);
  
    // Create a new transaction and specify the store and data privileges.
    const tx = contactDb.transaction('contacts', 'readwrite');
  
    // Open up the desired object store.
    const store = tx.objectStore('contacts');
  
    // Use the .add() method on the store and pass in the content.
    const request = store.add({ name: name, email: email, phone: phone, profile: profile });
  
    // Get confirmation of the request.
    const result = await request;
    console.log('🚀 - data saved to the database', result);
  }

  export const deleteDb = async (id) => {
    console.log('DELETE from the database', id)

    const contactDb = await openDB('contact_db', 1)

    const tx = contactDb.transaction('contacts', 'readwrite')

    const store = tx.objectStore('contacts')

    const request = store.delete(id)

    const results = await request
    console.log('result.value', results)

    return results
  }

  export const editDb = (id) => {
    console.log('EDIT from the database', id)

    const contactDb = await openDB('contact_db', 1)

    const tx = contactDb.transaction('contacts', 'readwrite')

    const store = tx.objectStore('contacts')

    const request = store.put({ id: id, name: name, email: email, phone: phone, profile: profile })

    const results = await request
    console.log('data saved to database', results)
  }