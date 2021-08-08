import { useQuery, useMutation } from "@apollo/client";
import { CREATE_GROUP, SET_ACTIVE_GROUP } from "../graphql/mutations";
import { GET_GROUPS } from "../graphql/queries";
import { defaultMutationOptions } from "../helper";

export function useGroupManager() {
    const { loading, error, data, refetch } = useQuery(GET_GROUPS);
  
    const [createGroup, createGroupResult] = useMutation(
      CREATE_GROUP,
      defaultMutationOptions
    );
    const [setActiveGroup, setActiveGroupResult] = useMutation(
      SET_ACTIVE_GROUP,
      defaultMutationOptions
    );
  
    const groups =
      data &&
      !(loading || error) &&
      data?.currentPerson?.personGroupsByPersonId?.nodes?.map((g: any) => ({
        groupName: g.groupByGroupId.name,
        groupId: g.groupByGroupId.id,
        members:
          g?.groupByGroupId.personGroupsByGroupId?.nodes?.map(
            (p: any) => p.personByPersonId.displayName
          ) ?? [],
      }));
  
    let currentPersonId = data?.currentPerson?.id ?? 0;
    let activeGroupId =
      data?.currentPerson?.activeGroup ?? (groups ? groups[0]?.groupId : 0);
    let activeGroup = groups
      ? groups.find((g: any) => g.groupId === activeGroupId)
      : {};
  
    let canCreateGroup =
      !(loading || error) &&
      (data?.currentPerson?.personGroupsByPersonId?.nodes?.every(
        (x: any) => x?.groupByGroupId?.createdBy !== currentPersonId ?? false
      ) ??
        true);
  
    return {
      createGroup,
      createGroupResult,
      loading,
      error,
      data,
      refetch,
      groups,
      activeGroup,
      canCreateGroup,
      currentPersonId,
      activeGroupId,
      setActiveGroup,
      setActiveGroupResult,
    };
  }