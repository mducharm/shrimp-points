export const defaultMutationOptions = {
    onCompleted(d: any) {
        console.log(d);

    },
    onError({ graphQLErrors, networkError }: any) {
        if (graphQLErrors) {
            for (let err of graphQLErrors) {
                console.log(err);
            }
        }
        if (networkError) {
            console.log(`[Network error]: ${networkError}`);
        }
    },
}