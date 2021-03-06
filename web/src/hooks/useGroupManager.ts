import { useQuery, useMutation } from "@apollo/client";
import { ReactNode } from "react";
import { CANCEL_INVITE, CREATE_GROUP, SEND_INVITE, SET_ACTIVE_GROUP } from "../graphql/mutations";
import { GET_GROUPS } from "../graphql/queries";
import { defaultMutationOptions } from "../helper";

export type Person = {
  displayName: string;
  id: number;
}
export type Group = {
  groupName: string;
  groupId: number;
  members: Person[];
  pendingInvites: Person[];
}
export type Invite = {
  from: Person;
  groupName: string;
}

type TaggedState<T extends string> = T;

export type NoGroupWithInvites = TaggedState<"NoGroupWithInvites">;
export type NoGroup = TaggedState<"NoGroup">;
export type HasCreatedGroup = TaggedState<"HasCreatedGroup">;

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

  const [sendInvite, sendInviteResult] = useMutation(SEND_INVITE, defaultMutationOptions)
  const [cancelInvite, cancelInviteResult] = useMutation(CANCEL_INVITE, defaultMutationOptions)

  const groups: Group[] =
    data &&
    !(loading || error) &&
    (data?.currentPerson?.personGroupsByPersonId?.nodes?.map((g: any) => ({
      groupName: g.groupByGroupId.name,
      groupId: g.groupByGroupId.id,
      members:
        g?.groupByGroupId.personGroupsByGroupId?.nodes?.map(
          (p: any) => p.personByPersonId
        ) ?? [],
      pendingInvites:
        g?.groupByGroupId?.groupInvitesByGroupId?.nodes?.map(
          (p: any) => p.personByToPersonId
        ) ?? [],
    })) ?? []);

  const isInGroup = data?.currentPerson?.personGroupsByPersonId?.nodes?.length > 0 ?? false;
  const invites: Invite[] = (data?.currentPerson?.groupInvitesByToPersonId?.nodes ?? [])
    .map((n: any) => ({
      from: { displayName: n.personByCreatedBy.displayName, id: n.personByCreatedBy.id },
      groupName: n.groupByGroupId.name
    }))

  const hasInvites = invites.length > 0 ?? false;

  let currentPersonId: number = data?.currentPerson?.id ?? 0;

  let activeGroupId: number =
    data?.currentPerson?.activeGroup ?? (groups ? groups[0]?.groupId : 0);

  let activeGroup: Group = groups?.find((g: any) => g.groupId === activeGroupId)
    ?? { groupId: 0, groupName: "", members: [], pendingInvites: [] }

  let canCreateGroup: boolean =
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
    sendInvite,
    sendInviteResult,
    isInGroup,
    invites,
    hasInvites,
    cancelInvite, 
    cancelInviteResult
  };
}