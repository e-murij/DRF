import graphene
from graphene_django import DjangoObjectType
from .models import NoteToDo, Project
from usersapp.models import User


class NoteToDoType(DjangoObjectType):
    class Meta:
        model = NoteToDo
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)

    def resolve_all_projects(root, info):
        return Project.objects.all()

    all_notes = graphene.List(NoteToDoType)

    def resolve_all_notes(root, info):
        return NoteToDoType.objects.all()

    all_notes_by_project_name = graphene.List(NoteToDoType, project=graphene.String(required=True))

    def resolve_all_notes_by_project_name(root, info, project):
        try:
            return NoteToDo.objects.filter(project__name=project)
        except NoteToDo.DoesNotExist:
            return None


class ProjectUpdateMutation(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        name = graphene.String(required=False)
        link_repository = graphene.String(required=False)

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, id, name=None, link_repository=None):
        project = Project.objects.get(pk=id)
        if name:
            project.name = name
        if link_repository:
            project.link_repository = link_repository
        if name or link_repository:
            project.save()
        return cls(project)


class Mutations(graphene.ObjectType):
    update_project = ProjectUpdateMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutations)
