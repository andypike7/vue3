import { getPersistentState } from '@intterra/common/hooks';
import { useAsyncComputed } from '@intterra/shared/ui/hooks/AsyncComputed';
import { useDictNavigation } from './DictNavigation.provider';
import { DiseasesFiltersStore, getDiseaseFiltersByStore } from '../../diseases/composition';
import { useDataSource } from '../../../../hooks/DataSource.hook';
import { RouteLocation, useRouter } from 'vue-router';
import { Ref, watch } from 'vue';
import { get } from 'lodash';
import { RoutePagesNames } from '../../../../router/constants';

export function useDiseaseNavigation (
  diseaseId: Ref<string>
) {
  const { dataSource } = useDataSource();
  const { setNextRoute, setPrevRoute } = useDictNavigation();
  const { savedState } = getPersistentState();
  const router = useRouter();
  const store: DiseasesFiltersStore | undefined = get(savedState, 'store');

  const resolveRouteById = (diseaseId?: string): RouteLocation | undefined => {
    if (!diseaseId) return;

    const { query } = router.currentRoute.value;

    return router.resolve({
      name: RoutePagesNames.DICTS_DISEASE,
      params: { diseaseId },
      query
    });
  };

  const { state: ids } = useAsyncComputed({
    get: async () => {
      if (!store) return null;
      const filters = getDiseaseFiltersByStore(store);
      return dataSource.listDiseaseIds(filters);
    },
    default: null
  });

  const updateRoutes = () => {
    if (!Array.isArray(ids.value)) return;
    const index = ids.value.indexOf(diseaseId.value);

    setNextRoute(resolveRouteById(ids.value[index + 1]));
    setPrevRoute(resolveRouteById(ids.value[index - 1]));
  };

  watch(ids, updateRoutes, { immediate: true });
  watch(diseaseId, updateRoutes, { immediate: true });
}
