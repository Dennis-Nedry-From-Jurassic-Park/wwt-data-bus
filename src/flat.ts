// https://reacthustle.com/blog/flatten-object-javascript-typescript

export async function flattenObject(obj, separator = '.') {
    let result = {};
    function recurse(cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
            for (let i = 0, l = cur.length; i < l; i++) {
                recurse(cur[i], prop + separator + i);
                if (l == 0) result[prop] = [];
            }
        } else {
            let isEmpty = true;
            for (let p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? prop + separator + p : p);
            }
            if (isEmpty && prop) result[prop] = {};
        }
    }
    recurse(obj, '');
    return result;
}

export const flattenObj_ = (ob) => {

    // The object which contains the
    // final result
    let result = {};

    // loop through the object "ob"
    for (const i in ob) {

        // We check the type of the i using
        // typeof() function and recursively
        // call the function again
        if ((typeof ob[i]) === 'object' && !Array.isArray(ob[i])) {
            const temp = flattenObj_(ob[i]);
            for (const j in temp) {

                // Store temp in result
                result[i + '.' + j] = temp[j];
            }
        }

        // Else store ob[i] in result directly
        else {
            result[i] = ob[i];
        }
    }
    return result;
};

export const _flattenObject = (obj:Object, parentKey?:string) => {
    let result = {};

    Object.keys(obj).forEach((key) => {
        const value = obj[key];
        const _key = parentKey ? parentKey + '.' + key : key;
        if (typeof value === 'object') {
            result = { ...result, ..._flattenObject(value, _key) };
        } else {
            result[_key] = value;
        }
        //console.log(`parentKey: "${parentKey}", _key: "${_key}"`);
    });

    return result;
};

export const flattenObjectES2017 = (obj: Object, parentKey?: string) => {
    let result = {};

    Object.entries(obj).forEach(([key, value]) => {
        const _key = parentKey ? parentKey + '.' + key : key;
        if (typeof value === 'object') {
            result = { ...result, ...flattenObjectES2017(value, _key) };
        } else {
            result[_key] = value;
        }
    });

    return result;
};
